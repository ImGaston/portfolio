#!/usr/bin/env node
// Sincroniza una carpeta de fotos de tu Mac con la sección /photos del sitio.
//
// Uso (en tu Mac, desde la raíz del repo):
//   node scripts/photos-sync.mjs            → genera/actualiza/borra las fotos, sin tocar git
//   node scripts/photos-sync.mjs --push     → además hace commit y push si hubo cambios
//   node scripts/photos-sync.mjs --dry-run  → solo muestra qué haría
//
// Nunca modifica la carpeta de origen ni sube los originales: genera versiones WebP
// redimensionadas en public/photos/ (sin EXIF ni GPS) y el índice content/photos.json.

import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import exifr from 'exifr';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'photos');
const MANIFEST = path.join(ROOT, 'content', 'photos.json');
const SOURCE = process.env.PHOTOS_DIR || path.join(os.homedir(), 'Pictures', 'gastoncorbalan.com');

// Anchos generados. La columna mide 36rem (576px): 1200 cubre pantallas 2x y 3x.
const WIDTHS = [640, 1200, 1800];
const QUALITY = 80;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.heic', '.heif']);

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const PUSH = args.has('--push');

function slugify(text) {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'foto'
  );
}

// Nombres que pone la cámara o el teléfono: no sirven como título.
const CAMERA_NAME = /^(img|dsc|dscf|dscn|_dsc|pxl|mvimg|gopr|dji|photo|image|r\d|l\d|p\d|\d)[\w-]*$/i;

function titleFromFilename(file) {
  const base = path.basename(file, path.extname(file)).trim();
  if (CAMERA_NAME.test(base.replace(/\s+/g, '_'))) return '';
  const text = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const text = (v) => {
  if (v == null) return '';
  if (typeof v === 'string') return v.trim();
  if (Array.isArray(v)) return text(v[0]);
  if (typeof v === 'object') return text(v.value ?? Object.values(v)[0]);
  return String(v).trim();
};

const pad = (n) => String(n).padStart(2, '0');
// La fecha de la cámara no trae zona horaria: se guarda tal cual, solo el día.
const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function shutter(t) {
  if (!t) return '';
  if (t >= 1) return `${Math.round(t * 10) / 10}s`;
  return `1/${Math.round(1 / t)}`;
}

function camera(make, model) {
  make = text(make);
  model = text(model);
  if (!model) return make;
  const brand = make.split(/\s+/)[0];
  if (brand && model.toLowerCase().startsWith(brand.toLowerCase())) return model;
  return [make.replace(/\s+(corporation|corp\.?|imaging|co\.?,? ?ltd\.?)$/i, ''), model]
    .filter(Boolean)
    .join(' ');
}

async function readMeta(file, stat) {
  let m = {};
  try {
    m = (await exifr.parse(file, { xmp: true, iptc: true, tiff: true, exif: true, gps: false })) || {};
  } catch {
    // Sin metadatos legibles: seguimos con lo que haya.
  }
  const taken = m.DateTimeOriginal || m.CreateDate || stat.mtime;
  const title = text(m.title) || text(m.ObjectName) || text(m.Headline) || titleFromFilename(file);
  const description = text(m.description) || text(m.Caption) || text(m.ImageDescription);
  const settings = [
    m.FocalLength ? `${Math.round(m.FocalLength)}mm` : '',
    m.FNumber ? `f/${Math.round(m.FNumber * 10) / 10}` : '',
    shutter(m.ExposureTime),
    m.ISO ? `ISO ${m.ISO}` : '',
  ].filter(Boolean);
  return {
    title,
    alt: description || title,
    date: isoDay(taken instanceof Date ? taken : new Date(taken)),
    camera: camera(m.Make, m.Model),
    settings: settings.join(' · '),
  };
}

// sharp no lee HEIC sin códecs extra; en el Mac lo convertimos antes con sips.
function decodable(file, tmp) {
  if (!/\.hei[cf]$/i.test(file)) return file;
  const out = path.join(tmp, `${crypto.randomUUID()}.jpg`);
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', file, '--out', out], {
    stdio: 'ignore',
  });
  return out;
}

async function render(file, id, tmp) {
  const input = decodable(file, tmp);
  const base = sharp(input, { failOn: 'none' }).rotate();
  const meta = await base.metadata();
  // Orientaciones 5 a 8 rotan 90°: ancho y alto se invierten.
  const turned = (meta.orientation || 1) >= 5;
  const width = turned ? meta.height : meta.width;
  const height = turned ? meta.width : meta.height;
  const { dominant } = await base.clone().resize(64).stats();
  const color = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
  const sizes = WIDTHS.filter((w) => w < width);
  if (width <= WIDTHS.at(-1)) sizes.push(width);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const w of sizes) {
    await base
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(OUT_DIR, `${id}-${w}.webp`));
  }
  return { width, height, color, widths: sizes };
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST)) return [];
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    if (DRY_RUN) {
      console.log(`No existe la carpeta ${SOURCE}.`);
      return;
    }
    fs.mkdirSync(SOURCE, { recursive: true });
    console.log(`Creé la carpeta ${SOURCE}. Poné ahí las fotos que quieras publicar.`);
  }

  const previous = new Map(loadManifest().map((p) => [p.source, p]));
  const files = fs
    .readdirSync(SOURCE)
    .filter((f) => !f.startsWith('.') && EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'photos-sync-'));
  const photos = [];
  const changes = [];
  const usedIds = new Set();

  try {
    for (const source of files) {
      const file = path.join(SOURCE, source);
      const stat = fs.statSync(file);
      // Huella barata (tamaño + fecha de modificación) para no reprocesar en cada corrida.
      const fingerprint = `${stat.size}-${Math.round(stat.mtimeMs)}`;
      const prev = previous.get(source);
      if (prev && prev.fingerprint === fingerprint) {
        photos.push(prev);
        usedIds.add(prev.id);
        continue;
      }

      const hash = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
      const meta = await readMeta(file, stat);
      const id = `${slugify(path.basename(source, path.extname(source)))}-${hash}`;
      usedIds.add(id);

      if (prev && prev.id === id) {
        // Mismo contenido (solo cambió la fecha del archivo): solo actualizamos datos.
        photos.push({ ...prev, ...meta, fingerprint });
        continue;
      }

      changes.push(`${prev ? 'actualizada' : 'nueva'}: ${source}`);
      if (DRY_RUN) continue;
      try {
        const image = await render(file, id, tmp);
        photos.push({ id, source, fingerprint, ...meta, ...image });
      } catch (err) {
        changes.pop();
        console.error(`  no pude procesar ${source}: ${err.message}`);
        if (prev) photos.push(prev);
        if (prev) usedIds.add(prev.id);
      }
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  for (const source of previous.keys()) {
    if (!files.includes(source)) changes.push(`borrada: ${source}`);
  }

  // Borra los WebP que ya no usa ninguna foto (borradas o reemplazadas).
  if (!DRY_RUN && fs.existsSync(OUT_DIR)) {
    for (const f of fs.readdirSync(OUT_DIR)) {
      const id = f.replace(/-\d+\.webp$/, '');
      if (!usedIds.has(id)) fs.rmSync(path.join(OUT_DIR, f));
    }
  }

  photos.sort((a, b) => b.date.localeCompare(a.date) || a.source.localeCompare(b.source));
  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
    const json = `${JSON.stringify(photos, null, 2)}\n`;
    if (!fs.existsSync(MANIFEST) || fs.readFileSync(MANIFEST, 'utf8') !== json) {
      fs.writeFileSync(MANIFEST, json);
    }
  }

  const stamp = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
  if (changes.length) console.log(`[${stamp}]\n${changes.map((c) => `  ${c}`).join('\n')}`);
  else console.log(`[${stamp}] Sin cambios en las fotos (${photos.length} publicadas).`);
  if (DRY_RUN || !PUSH) return;

  const run = (...a) => execFileSync('git', a, { cwd: ROOT }).toString().trim();
  const git = (...a) => execFileSync('git', a, { cwd: ROOT, stdio: 'inherit' });
  const branch = run('rev-parse', '--abbrev-ref', 'HEAD');
  if (branch !== 'main') {
    console.error(`No publico: estás en la rama "${branch}". Pasate a main (git checkout main).`);
    process.exit(1);
  }
  // Si Bear está publicando en este momento, esperamos a la próxima corrida.
  if (fs.existsSync(path.join(ROOT, '.git', 'index.lock'))) {
    console.log('  git está ocupado; lo intento en la próxima corrida.');
    return;
  }
  const paths = ['content/photos.json', 'public/photos'].filter((p) => fs.existsSync(path.join(ROOT, p)));
  git('add', '--all', '--', ...paths);
  const staged = run('diff', '--cached', '--name-only');
  if (staged) {
    const summary = changes.length ? changes.join('\n') : 'fotos regeneradas';
    git('commit', '-q', '-m', `photos: sincronizar desde la carpeta\n\n${summary}`);
  }
  git('fetch', '-q', 'origin', 'main');
  const ahead = Number(run('rev-list', '--count', 'origin/main..HEAD'));
  if (!ahead) return;
  git('pull', '-q', '--rebase', '--autostash', 'origin', 'main');
  git('push', '-q', 'origin', 'main');
  console.log('  publicado: push a main, Vercel lo despliega en un minuto.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
