# Design System: Minimal

Inspired by kyusuf.com: one typeface (Newsreader), a narrow column, neutral tones and very little decoration. The content carries the page.

## Principles
- **Quiet:** no display type, no colored blocks, no emojis. Hierarchy comes from weight (400/500) and the muted tone, not size. The one exception is the site header: the name is set at 1.5em so it sits above the content.
- **Narrow column:** 36rem max width, left-aligned, generous vertical space between sections.
- **Links stay readable:** inline links get a faint underline that darkens on hover; navigation links are muted and turn full color on hover.

## Color tokens (CSS variables in `styles/styles.css`, exposed to Tailwind)
| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `bg` | `#fcfcfb` | `#111111` | Page background |
| `fg` | `#171717` | `#ededed` | Body text, titles |
| `muted` | `#737373` | `#8f8f8f` | Dates, labels, nav, secondary copy |
| `line` | 10% black | 12% white | Rules, table borders |

Dark mode follows the system (`prefers-color-scheme`).

## Typography
- **Newsreader** (400, 500, 600, italic 400) for everything, 18px base, 1.6 line height.
- **Paper Mono** (400, 500), self-hosted from `public/fonts/paper-mono-v1.000`, for inline code and code blocks (`--font-mono`).
- Site header (`.site-header`): the name at 1.5em / 1.25, weight 500, -0.01em tracking, on every page; the "/ Blog" breadcrumb on posts shares that size.
- Page titles and post headings use weight 500 at roughly body size.

## Blog posts
Post HTML from Bear is styled under `.post` in `styles/styles.css`: muted yellow highlights (`--highlight`), muted blockquotes with a thin rule, tinted code blocks with build-time Shiki highlighting (`vitesse-light` / `vitesse-dark`, set in `lib/posts.js`), hairline tables, footnotes in muted small text.

## Photos (`/photos`)
One photo per row at full column width, 6px radius (same as post images), `space-y-14` between photos. Caption below: title left and date right (like the post list), then camera and settings in small muted text. While a photo loads, its box shows the photo's dominant color. No lightbox, grid or hover effects.
