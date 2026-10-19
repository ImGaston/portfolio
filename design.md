# Design System: Minimal

Inspired by kyusuf.com: one typeface (Newsreader), a narrow column, neutral tones and very little decoration. The content carries the page.

## Principles
- **Quiet:** no display type, no colored blocks, no emojis. Hierarchy comes from weight (400/500) and the muted tone, not size.
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
- Page titles and post headings use weight 500 at roughly body size.

## Blog posts
Post HTML from Bear is styled under `.post` in `styles/styles.css`: muted blockquotes with a thin rule, tinted code blocks, hairline tables, footnotes in muted small text.
