#!/usr/bin/env node
// Sincroniza las notas de Bear con la etiqueta #blog/publicado hacia content/posts.
//
// Uso (en tu Mac, desde la raíz del repo):
//   node scripts/bear-sync.mjs            → genera/actualiza/borra los .md, sin tocar git
//   node scripts/bear-sync.mjs --push     → además hace commit y push si hubo cambios
//   node scripts/bear-sync.mjs --dry-run  → solo muestra qué haría
//
// Lee la base de Bear en modo solo lectura; nunca modifica tus notas.

import { DatabaseSync } from 'node:sqlite';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const MEDIA_DIR = path.join(ROOT, 'public', 'blog');

const BEAR_DATA =
  process.env.BEAR_DATA_DIR ||
  path.join(
    os.homedir(),
    'Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data'
  );
const DB_PATH = process.env.BEAR_DB || path.join(BEAR_DATA, 'database.sqlite');
const PUBLISH_TAG = (process.env.BEAR_PUBLISH_TAG || 'blog/publicado').toLowerCase();

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const PUSH = args.has('--push');

// Bear guarda fechas como segundos desde 2001-01-01 (Core Data).
const CORE_DATA_EPOCH = Date.UTC(2001, 0, 1);
const toISO = (seconds) =>
  seconds == null ? null : new Date(CORE_DATA_EPOCH + seconds * 1000).toISOString();

function slugify(text) {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'post'
  );
}

// --- Lectura de Bear -------------------------------------------------------

function columns(db, table) {
  return db.prepare(`PRAGMA table_info(${table})`).all().map((c) => c.name);
}

// La tabla que une notas y etiquetas cambia de nombre entre versiones de Bear
// (p. ej. Z_5TAGS con Z_5NOTES / Z_13TAGS), así que la buscamos.
function findNoteTagJoin(db) {
  const tables = db
    .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name GLOB 'Z_[0-9]*TAGS'`)
    .all()
    .map((t) => t.name);
  for (const table of tables) {
    const cols = columns(db, table);
    const noteCol = cols.find((c) => /^Z_\d+NOTES$/.test(c));
    const tagCol = cols.find((c) => /^Z_\d+TAGS$/.test(c));
    if (noteCol && tagCol) return { table, noteCol, tagCol };
  }
  throw new Error('No encontré la tabla que une notas y etiquetas en la base de Bear.');
}

function readPublishedNotes(db) {
  const join = findNoteTagJoin(db);
  const noteCols = columns(db, 'ZSFNOTE');
  const flags = ['ZTRASHED', 'ZENCRYPTED', 'ZPERMANENTLYDELETED']
    .filter((c) => noteCols.includes(c))
    .map((c) => `AND COALESCE(n.${c}, 0) = 0`)
    .join(' ');

  const notes = db
    .prepare(
      `SELECT DISTINCT n.Z_PK AS pk, n.ZUNIQUEIDENTIFIER AS id, n.ZTITLE AS title,
              n.ZTEXT AS text, n.ZCREATIONDATE AS created, n.ZMODIFICATIONDATE AS modified
         FROM ZSFNOTE n
         JOIN ${join.table} j ON j.${join.noteCol} = n.Z_PK
         JOIN ZSFNOTETAG t ON t.Z_PK = j.${join.tagCol}
        WHERE (LOWER(t.ZTITLE) = ? OR LOWER(t.ZTITLE) LIKE ?) ${flags}`
    )
    .all(PUBLISH_TAG, `${PUBLISH_TAG}/%`);

  const hasFiles = db
    .prepare(`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'ZSFNOTEFILE'`)
    .get();
  const fileStmt = hasFiles
    ? db.prepare(
        `SELECT ZFILENAME AS filename, ZUNIQUEIDENTIFIER AS uuid FROM ZSFNOTEFILE WHERE ZNOTE = ?`
      )
    : null;

  return notes.map((n) => ({
    ...n,
    files: fileStmt ? fileStmt.all(n.pk) : [],
  }));
}

// --- Conversión de Markdown de Bear ----------------------------------------

const TAG_RE = /(^|\s)#(?!\s)([^\s#]+(?:[^\n#]*[^\s#]#)?)/g;

function isTagOnlyLine(line) {
  const trimmed = line.trim();
  return trimmed.length > 0 && !/^#+\s/.test(trimmed) && trimmed.replace(TAG_RE, '').trim() === '';
}

function convert(note, { slug, titleToSlug }) {
  let lines = (note.text || '').split('\n');

  // La primera línea "# Título" ya va al front matter.
  if (lines.length && /^#\s+/.test(lines[0])) lines.shift();
  // Fuera las líneas que solo tienen etiquetas (#Blog/publicado, #revfactor…).
  lines = lines.filter((l) => !isTagOnlyLine(l));
  let body = lines.join('\n');

  // El código (bloques ``` e `inline`) no se toca: se aparta y se repone al final.
  const code = [];
  body = body.replace(/```[\s\S]*?```|`[^`\n]+`/g, (m) => `\u0000${code.push(m) - 1}\u0000`);

  // Etiquetas #blog/... sueltas dentro del texto.
  body = body.replace(/(^|\s)#blog\/[^\s#]+/gi, '$1');

  // ==resaltado== → <mark>, ~subrayado~ → <u> (~~tachado~~ lo resuelve el render).
  body = body.replace(/==([^=\n]+)==/g, '<mark>$1</mark>');
  body = body.replace(/(^|[^~\w])~(?!~)([^~\n]+?)~(?![~\w])/g, '$1<u>$2</u>');

  // [[Otra nota]] → enlace si esa nota también está publicada, si no texto plano.
  body = body.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
    const label = alias || target;
    const targetSlug = titleToSlug.get(target.trim().toLowerCase());
    return targetSlug ? `[${label}](/blog/${targetSlug})` : label;
  });

  // Imágenes y archivos adjuntos (PDF, etc.): se copian a public/blog/<slug>/
  // y se reescribe la ruta. El comentario <!-- {"width":…} --> de Bear se descarta.
  const copies = [];
  body = body.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)(<!--.*?-->)?/g, (match, bang, label, src) => {
    if (/^([a-z]+:|\/|#)/i.test(src)) return `${bang}[${label}](${src})`;
    let filename;
    try {
      filename = decodeURIComponent(src);
    } catch {
      return match;
    }
    const file = note.files.find((f) => f.filename === filename);
    if (!file) return match;
    const from = ['Note Images', 'Note Files']
      .map((dir) => path.join(BEAR_DATA, 'Local Files', dir, file.uuid, file.filename))
      .find((p) => fs.existsSync(p));
    if (!from) return match;
    const safeName = `${file.uuid.slice(0, 8)}-${slugify(path.parse(filename).name)}${path
      .extname(filename)
      .toLowerCase()}`;
    copies.push({ from, to: path.join(MEDIA_DIR, slug, safeName) });
    return `${bang}[${label}](/blog/${slug}/${safeName})`;
  });

  body = body.replace(/\u0000(\d+)\u0000/g, (_, i) => code[i]);

  return { body: body.replace(/^\s+/, '').replace(/\s+$/, '') + '\n', copies };
}

function summarize(body) {
  const para = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !/^(#|!\[|>|-|\*|\d+\.|```|<)/.test(p));
  if (!para) return '';
  const plain = para.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '').replace(/[*_`~]/g, '');
  return plain.length > 200 ? plain.slice(0, 197).trimEnd() + '…' : plain;
}

// --- Front matter (formato simple: clave: valor en JSON) -------------------

function readFrontMatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const data = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) data[line.slice(0, i).trim()] = JSON.parse(line.slice(i + 1).trim());
    }
  }
  return data;
}

function writePost(meta, body) {
  const fm = Object.entries(meta)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
  return `---\n${fm}\n---\n\n${body}`;
}

// --- Principal --------------------------------------------------------------

function main() {
  if (!fs.existsSync(DB_PATH)) {
    console.error(`No encuentro la base de Bear en:\n  ${DB_PATH}\nDefiní BEAR_DB si está en otro lugar.`);
    process.exit(1);
  }

  let db;
  try {
    db = new DatabaseSync(DB_PATH, { readOnly: true });
  } catch (err) {
    console.error(
      `No pude abrir la base de Bear (${err.message}).\n` +
        'Si macOS bloquea el acceso, dale "Acceso total al disco" a la app de Terminal (y a node si lo corrés con launchd).'
    );
    process.exit(1);
  }
  const notes = readPublishedNotes(db);
  db.close();

  fs.mkdirSync(POSTS_DIR, { recursive: true });

  // Posts existentes, por id de Bear, para mantener slug y fecha de publicación.
  const existing = new Map();
  for (const f of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))) {
    const meta = readFrontMatter(path.join(POSTS_DIR, f));
    if (meta.bearId) existing.set(meta.bearId, { file: f, meta });
  }

  const usedSlugs = new Set();
  const plan = notes
    .sort((a, b) => (a.created ?? 0) - (b.created ?? 0))
    .map((note) => {
      const prev = existing.get(note.id);
      let slug = prev ? prev.file.replace(/\.md$/, '') : slugify(note.title || 'post');
      if (!prev) {
        const base = slug;
        for (let i = 2; usedSlugs.has(slug) || fs.existsSync(path.join(POSTS_DIR, `${slug}.md`)); i++) {
          slug = `${base}-${i}`;
        }
      }
      usedSlugs.add(slug);
      return { note, prev, slug };
    });

  const titleToSlug = new Map(
    plan.filter((p) => p.note.title).map((p) => [p.note.title.trim().toLowerCase(), p.slug])
  );

  const changes = [];
  for (const { note, prev, slug } of plan) {
    const { body, copies } = convert(note, { slug, titleToSlug });
    const meta = {
      title: (note.title || '').trim(),
      date: prev?.meta.date || new Date().toISOString(),
      updated: toISO(note.modified),
      summary: summarize(body),
      bearId: note.id,
    };
    const content = writePost(meta, body);
    const file = path.join(POSTS_DIR, `${slug}.md`);
    const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    if (old !== content) {
      changes.push(`${prev ? 'actualizado' : 'nuevo'}: ${slug}`);
      if (!DRY_RUN) fs.writeFileSync(file, content);
    }

    const keep = new Set(copies.map((c) => path.basename(c.to)));
    for (const { from, to } of copies) {
      if (fs.existsSync(to) && fs.statSync(to).size === fs.statSync(from).size) continue;
      changes.push(`adjunto: ${path.relative(ROOT, to)}`);
      if (!DRY_RUN) {
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(from, to);
      }
    }
    const mediaDir = path.join(MEDIA_DIR, slug);
    if (fs.existsSync(mediaDir)) {
      for (const f of fs.readdirSync(mediaDir).filter((f) => !keep.has(f))) {
        changes.push(`adjunto borrado: ${slug}/${f}`);
        if (!DRY_RUN) fs.rmSync(path.join(mediaDir, f));
      }
    }
  }

  // Notas que ya no tienen #blog/publicado (o se borraron) → se despublican.
  const published = new Set(notes.map((n) => n.id));
  for (const [id, { file }] of existing) {
    if (published.has(id)) continue;
    const slug = file.replace(/\.md$/, '');
    changes.push(`despublicado: ${slug}`);
    if (!DRY_RUN) {
      fs.rmSync(path.join(POSTS_DIR, file));
      fs.rmSync(path.join(MEDIA_DIR, slug), { recursive: true, force: true });
    }
  }

  const stamp = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
  if (changes.length) console.log(`[${stamp}]\n${changes.map((c) => `  ${c}`).join('\n')}`);
  else console.log(`[${stamp}] Sin cambios en Bear (${notes.length} notas publicadas).`);
  if (DRY_RUN || !PUSH) return;

  // Con --push se commitea lo que haya pendiente en content/posts y public/blog,
  // aunque lo haya generado una corrida anterior de bear:sync.
  const run = (...a) => execFileSync('git', a, { cwd: ROOT }).toString().trim();
  const git = (...a) => execFileSync('git', a, { cwd: ROOT, stdio: 'inherit' });
  const branch = run('rev-parse', '--abbrev-ref', 'HEAD');
  if (branch !== 'main') {
    console.error(`No publico: estás en la rama "${branch}". Pasate a main (git checkout main).`);
    process.exit(1);
  }
  // public/blog solo existe si algún post tiene imágenes; git falla con rutas inexistentes.
  const paths = ['content/posts', 'public/blog'].filter((p) => fs.existsSync(path.join(ROOT, p)));
  git('add', '--all', '--', ...paths);
  const staged = run('diff', '--cached', '--name-only');
  if (staged) {
    const summary = changes.length ? changes.join('\n') : staged;
    git('commit', '-q', '-m', `blog: sincronizar desde Bear\n\n${summary}`);
  }
  git('fetch', '-q', 'origin', 'main');
  const ahead = Number(run('rev-list', '--count', 'origin/main..HEAD'));
  if (!ahead) return;
  git('pull', '-q', '--rebase', '--autostash', 'origin', 'main');
  git('push', '-q', 'origin', 'main');
  console.log('  publicado: push a main, Vercel lo despliega en un minuto.');
}

main();
