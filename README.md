# AtlasBridge Construction

Marketing site for AtlasBridge Construction, built from the reference designs.
Vite + React 19 + TypeScript + Tailwind CSS v4, with React Router for the page
shell.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
```

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Types only, no emit |
| `npm run lint` | ESLint over `src/` |

## Images

**No image files ship with this repo.** Every slot renders a labelled
placeholder showing the filename it wants and the size to export at. Drop your
artwork into `public/images/` using those exact filenames and it appears on
reload — see [`public/images/README.md`](public/images/README.md) for the full
table.

## Layout of the code

```
src/
  components/
    layout/     TopBar, Header, SecondaryNav, PageHero, Footer,
                CallMeBackTab, ChatWidget, ThemeToggle, Layout
    home/       Hero, HeroSlideshow, WhatWeDo, ServicesRail,
                Sustainable, Infrastructure, FindUs
    about/      ValueCards, StatsBand, BrandStrip
    ui/         Img, Icon, Logo, Accordion, SectionHeading
  data/         All copy and content — images, services, navigation,
                site details, about, responsibility
  pages/        One file per route
```

Content lives in `src/data/`, not inside components. Adding a service to
`services` in `src/data/services.ts` puts it on the Services page **and** in
the SERVICES nav dropdown; adding a Corporate Responsibility entry to
`src/data/responsibility.ts` creates its sub-page and its card on the index.

## Design system

Brand colours and semantic tokens are defined in `src/index.css`. `navy` and
`gold` are fixed; everything else (`bg`, `surface`, `ink`, `body`, `line`) is a
token that flips for dark mode. Dark mode is a `.dark` class on `<html>`,
toggled by `ThemeToggle` and persisted to `localStorage`.

Two helpers worth knowing:

- `.shell` — the standard max-width page container.
- `.highlight-gold` — the gold marker-pen effect behind heading words.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/corporate-responsibility` | Responsibility index |
| `/corporate-responsibility/:slug` | `csr`, `diversity-and-inclusion`, `sustainability` |
| `/careers` | Careers |
| `/contact` | Contact |

Any unmatched path renders the 404 page.

## Things that are stubs

- The contact form, the Call Me Back tab and the chat widget all resolve
  locally with a confirmation message. Point their `onSubmit` handlers at a
  real endpoint when there is one.
- The map is a static image. Swap it for a Google Maps `<iframe>` in
  `src/components/home/FindUs.tsx` if you want a live map.
