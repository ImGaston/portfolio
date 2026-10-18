import fs from 'fs';
import path from 'path';
import { Marked } from 'marked';
import markedFootnote from 'marked-footnote';

// Los posts los genera scripts/bear-sync.mjs a partir de las notas de Bear.
const marked = new Marked().use(markedFootnote({ description: 'Notas' }));

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

export function getAllPosts() {
  return slugs()
    .map((slug) => {
      const { meta } = read(slug);
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || null,
        summary: meta.summary || '',
      };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getPostSlugs() {
  return slugs();
}

export function getPost(slug) {
  const { meta, body } = read(slug);
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || null,
    updated: meta.updated || null,
    summary: meta.summary || '',
    html: marked.parse(body),
  };
}
