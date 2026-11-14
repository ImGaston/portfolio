import fs from 'fs';
import path from 'path';

// El índice lo genera scripts/photos-sync.mjs a partir de una carpeta de tu Mac.
const MANIFEST = path.join(process.cwd(), 'content', 'photos.json');

export function getAllPhotos() {
  if (!fs.existsSync(MANIFEST)) return [];
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).map(
    ({ id, title, alt, date, camera, settings, width, height, color, widths }) => ({
      id,
      title: title || '',
      alt: alt || '',
      date: date || null,
      camera: camera || '',
      settings: settings || '',
      width,
      height,
      color: color || null,
      widths,
    })
  );
}
