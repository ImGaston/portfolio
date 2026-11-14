import fs from 'fs';
import path from 'path';
import { Marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { createHighlighter } from 'shiki';

// Los posts los genera scripts/bear-sync.mjs a partir de las notas de Bear.

const THEMES = { light: 'vitesse-light', dark: 'vitesse-dark' };
const LANGS = [
  'bash', 'css', 'html', 'javascript', 'json', 'jsx', 'markdown', 'python',
  'r', 'sql', 'typescript', 'tsx', 'yaml',
];

let markedPromise;

// Code blocks are highlighted at build time with Shiki; the page ships no JS for it.
function getMarked() {
  markedPromise ??= createHighlighter({ themes: Object.values(THEMES), langs: LANGS }).then(
    (highlighter) =>
      new Marked().use(markedFootnote({ description: 'Notas' }), {
        renderer: {
          // marked 12 passes (code, infostring) positionally.
          code(text, lang) {
            const id = (lang || '').trim().split(/\s+/)[0].toLowerCase();
            const resolved = highlighter.getLoadedLanguages().includes(id) ? id : 'text';
            return highlighter.codeToHtml(text, {
              lang: resolved,
              themes: THEMES,
              defaultColor: false,
            });
          },
        },
      })
  );
  return markedPromise;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function parse(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (!match) return { meta, body: raw };
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = JSON.parse(line.slice(i + 1).trim());
  }
  return { meta, body: raw.slice(match[0].length) };
}

function slugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function read(slug) {
  return parse(fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8'));
}

// Same rules as slugify in scripts/bear-sync.mjs: "Diseño web" → "diseno-web".
export function tagSlug(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTags(list) {
  return (Array.isArray(list) ? list : [])
    .map((name) => ({ name, slug: tagSlug(name) }))
    .filter((t) => t.slug);
}

export function getAllPosts() {
  return slugs()
    .map((slug) => {
      const { meta } = read(slug);
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || null,
        summary: meta.summary || '',
        tags: toTags(meta.tags),
      };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

// Every tag used by at least one post, most used first, then alphabetically.
// The first spelling seen (newest post) is the one shown.
export function getAllTags() {
  const bySlug = new Map();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const entry = bySlug.get(tag.slug) || { ...tag, count: 0 };
      entry.count += 1;
      bySlug.set(tag.slug, entry);
    }
  }
  return [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, 'es')
  );
}

export function getPostSlugs() {
  return slugs();
}

export async function getPost(slug) {
  const { meta, body } = read(slug);
  const marked = await getMarked();
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || null,
    updated: meta.updated || null,
    summary: meta.summary || '',
    tags: toTags(meta.tags),
    html: marked.parse(body),
  };
}
