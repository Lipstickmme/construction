# Axis Construction

Marketing site for Axis Construction — industrial and energy infrastructure.
Vite + React 19 + TypeScript + Tailwind CSS v4, with React Router.

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

## Contact details are placeholders

There are no real addresses, phone numbers or inboxes anywhere in this site.
Everything routes through the `contact` block in `src/data/site.ts`:

```ts
contact: {
  email: 'hello@axis.example',
  phone: '+00 000 0000 000',
  address: ['000 Placeholder Way', 'City, Region 00000', 'Country'],
  hours: 'Mon – Fri, 08:00 – 18:00',
}
```

Replace that block and every page updates — header, drawer, footer and the
contact page. The footer and contact page both say so on the page, so nobody
mistakes a placeholder for a live number; remove those notes when the real
details go in.

## Layout of the code

```
src/
  components/
    layout/   Header, SideNav, PageHeader, Footer, Layout
    home/     Hero, Marquee, CapabilityGrid, FeaturedWork,
              Metrics, Process, CallToAction
    ui/       Img, Reveal, CountUp, Logo
  data/       site, images, capabilities, navigation
  pages/      One file per route
```

Content lives in `src/data/`. Adding an entry to `capabilities` in
`src/data/capabilities.ts` gives it a card on the home grid, a row on the
capabilities index, an entry in the drawer's sub-menu, a link in the footer
and its own page at `/capabilities/<id>`.

## Design system

Defined as tokens in `src/index.css`. The palette is deliberately narrow — a
greyscale spine, orange as the single loud accent, yellow for secondary marks.

| Token | Value | Used for |
| --- | --- | --- |
| `black` | `#0C0D0E` | Dark bands, headings |
| `charcoal` / `graphite` | `#16181A` / `#24282B` | Panels, drawer |
| `steel` / `concrete` / `ash` / `fog` | greys | Body copy, rules, tints |
| `orange` | `#FF5C00` | Primary accent, CTAs, active state |
| `yellow` | `#FFC300` | Marquee, hazard banding, tags |

Helpers:

- `.shell` — max-width page container.
- `.kicker` — section label: short orange rule then uppercase micro-type.
- `.index-num` — tabular `01`, `02` … numerals.
- `.hazard` — diagonal yellow/black banding.
- `.link-wipe` — underline that wipes in from the left on hover.

## Navigation

All navigation lives in a slide-in drawer (`components/layout/SideNav.tsx`).
The header only carries the wordmark, a contact link and the menu trigger, and
turns solid once scrolled so it reads over both the dark hero and white pages.

The drawer traps focus while open, closes on Escape or scrim click, locks
background scroll, and restores focus to the trigger on close. Links cascade
in on a stagger behind the panel.

## Motion

- `<Reveal>` fades and lifts children the first time they enter the viewport;
  pass an increasing `delay` to stagger a list.
- `.line-mask` wipes headline lines up from behind a mask — used in the hero.
- `<CountUp>` counts to its figure on first view, parsing any trailing suffix.
- `.marquee-track` runs the capability ticker; the list is rendered twice and
  translated by exactly -50%, so the loop is seamless.

All of it respects `prefers-reduced-motion`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/capabilities` | Capabilities index |
| `/capabilities/:slug` | One page per capability, driven by `capabilities` |
| `/projects` | Projects |
| `/careers` | Careers |
| `/contact` | Contact |

Any unmatched path renders the 404 page.

## Things that are stubs

- The contact form resolves locally with a confirmation. Point its `onSubmit`
  at a real endpoint before going live — the confirmation message says so.
- Careers roles link to the contact page rather than an ATS.
- Project entries carry placeholder locations pending client approval.
