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
    layout/     TopBar, Header, PageHero, Footer, CallMeBackTab,
                ChatWidget, Layout
    home/       Hero, SectionNav, WhatWeDo, ProjectPrompt,
                ServicesRail, Sustainable, Infrastructure, FindUs
    about/      ValueCards, StatsBand, BrandStrip
    ui/         Img, Icon, Logo, Accordion, SectionHeading, MapEmbed
  data/         All copy and content — images, services, navigation,
                site details, about, responsibility
  pages/        One file per route
```

Content lives in `src/data/`, not inside components. Adding a service to
`services` in `src/data/services.ts` puts it on the Services page **and** in
the SERVICES nav dropdown; adding a Corporate Responsibility entry to
`src/data/responsibility.ts` creates its sub-page and its card on the index.

## Design system

Brand colours and semantic tokens are defined in `src/index.css`, taken from
the reference site's Elementor globals:

| Token | Value | Used for |
| --- | --- | --- |
| `navy` | `#002E42` | Headings, dark bands, primary |
| `gold` | `#FAD55B` | Accent, buttons, highlights |
| `blue` | `#002C5F` | Chip/eyebrow text on white |
| `overlay` | `rgb(0 46 66 / 0.64)` | The wash over hero background images |
| `body` | `#002E42B3` | Body copy — the navy at 70%, not a separate grey |

`navy`, `gold` and `blue` are fixed; the rest (`bg`, `surface`, `ink`, `body`,
`line`) flip for dark mode.

**The site is white by default, and there is no theme switcher.** The
reference has no dark mode, so the header carries only the logo and the nav.
The `.dark` token block in `index.css` is inert — nothing adds that class. Say
the word if you want it stripped out entirely.

The `overlay` value is exact — the reference paints one flat
`rgba(0,46,66,.64)` shape over each hero image, with no gradient. It only
looks right over real photography; while images are missing, `<Img>`'s `plain`
placeholder renders `--mist` (`#A2B2C9`), roughly the average tone of a
daylight building shot, so the band previews the blue it will actually have.

Helpers worth knowing:

- `.shell` — the standard max-width page container.
- `.highlight-gold` — the gold marker-pen effect, for headings on a **light**
  background. It covers only the lower part of each glyph, so the tops rely on
  the page behind them for contrast.
- `.highlight-solid` — same idea for headings on a **dark** background (the
  hero, the navy bands). Fills the whole box so no letter loses contrast.
- `.rail` — the horizontal card rail that lines up with `.shell` on the left
  and bleeds off the right edge.

## The home page's section menu

The bar under the hero (`src/components/home/SectionNav.tsx`) is a section
navigator, not a site menu. Each entry scrolls to a section further down and
underlines itself while that section is in view; the bar then sticks beneath
the header as you scroll.

Entries are declared in `sectionNav` in `src/data/navigation.ts`, where each
`targetId` must match the `id` on a home-page section. Those sections also
carry `scroll-mt-[8.5rem]` so the two sticky bars don't cover their headings —
keep that in step with the header height if you change it.

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
- The language switcher in the top bar changes its own label and nothing else.
  Wire it to an i18n setup when you have one.
