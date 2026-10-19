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
scripts/         → Bear → blog sync script + launchd installer (see docs/bear-blog.md)
styles/
  styles.css     → Global styles + Tailwind directives
public/
  images/        → Project screenshots
  favicon.png    → Favicon (48×48), plus apple-touch-icon.png (180×180)
  og.png         → Open Graph image (1200×630)
tailwind.config.js → Content paths (tokens live in styles.css)
```

## Design System
See `design.md`. Minimal style inspired by kyusuf.com: Newsreader only, 36rem column, neutral colors.

### Colors (CSS variables → Tailwind tokens)
- `bg`, `fg`, `muted`, `line`, defined in `styles/styles.css` with light and dark (`prefers-color-scheme`) values

### Fonts
- **Everything:** Newsreader (400/500/600, italic 400)
- **Code:** Paper Mono (400/500), self-hosted in `public/fonts/paper-mono-v1.000`

## Commands
```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Start production server
npm run bear:sync     # (Mac) Pull #blog/publicado notes from Bear into content/posts
npm run bear:publish  # (Mac) Same, then commit and push to main
npm run bear:install  # (Mac) Run bear:publish every 5 min via launchd (bear:status, bear:uninstall)
```

## Deployment
Static site, single page. Uses Google Fonts via CDN (preconnect optimized).
