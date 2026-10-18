# Portfolio - Gastón Corbalán

## Project Overview
Personal portfolio website for Gastón Corbalán, a Revenue Management and Pricing specialist based in Madrid. Partner at Revfactor and working at Blackbird HM.

## Tech Stack
- **Framework:** Next.js 14.2 (Pages Router)
- **UI:** React 18.2
- **Styling:** Tailwind CSS 4.1 + PostCSS
- **Icons:** React Icons 4.4
- **Node:** 22.x

## Project Structure
```
pages/
  _app.js        → Global layout, favicon, title
  _document.js   → SEO meta tags, Google Fonts
  index.js       → Single-page portfolio (hero, links)
  blog/          → Blog index and posts (from content/posts)
content/posts/   → Markdown posts generated from Bear by scripts/bear-sync.mjs
lib/             → Post loading (posts.js) and date formatting (format.js)
scripts/         → Bear → blog sync script + launchd template (see docs/bear-blog.md)
styles/
  styles.css     → Global styles + Tailwind directives
public/
  images/        → Project screenshots
  favicon.png
  opengraph-cover.png
tailwind.config.js → Custom colors, fonts
```

## Design System
See `design.md` for the full "High-End Editorial / Modern Archivist" design system.

### Colors (Tailwind tokens)
- `verdant` → `#0B3D2E` (primary green)
- `amber` → `#FCB017` (accent gold)
- `parchment` → `#FAF9F6` (background)
- `slate` → `#2D3436` (body text)

### Fonts
- **Headings:** Noto Serif (Bold/Black)
- **Body:** Inter / Noto Sans
- **Accent:** Newsreader (Italic)

## Commands
```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Start production server
npm run bear:sync     # (Mac) Pull #blog/publicado notes from Bear into content/posts
npm run bear:publish  # (Mac) Same, then commit and push
```

## Deployment
Static site, single page. Uses Google Fonts via CDN (preconnect optimized).
