# Image drop folder

Every image on the site is a placeholder until a real file lands here. Drop a
file in using the **exact filename** below and it swaps itself in on reload —
no code change needed.

The full list lives in `src/data/images.ts`. Most placeholder panels also print
their own filename and target size, so you can work straight from the browser.

## Home

| Filename | Used on | Target size |
| --- | --- | --- |
| `hero-construction-site.jpg` | Hero slideshow — slide 1 | 1600 × 1000 |
| `hero-bridge.jpg` | Hero slideshow — slide 2 | 1600 × 1000 |
| `hero-tunnel.jpg` | Hero slideshow — slide 3 | 1600 × 1000 |
| `hero-highrise.jpg` | Hero slideshow — slide 4 | 1600 × 1000 |
| `sustainable-excavator.jpg` | Sustainable Infrastructure | 1000 × 760 |
| `infrastructure-cranes.jpg` | Modern City Infrastructure | 900 × 1100 |
| `map-brisbane.jpg` | Find Us band, and the Contact page hero | 2400 × 700 |

### Services rail (dark section)

| Filename | Target size |
| --- | --- |
| `rail-civil-engineering.jpg` | 800 × 900 |
| `rail-interior-design.jpg` | 800 × 900 |
| `rail-industrial-engineering.jpg` | 800 × 900 |
| `rail-concrete-structures.jpg` | 800 × 900 |
| `rail-historic-restoration.jpg` | 800 × 900 |

## Services page

| Filename | Target size |
| --- | --- |
| `service-roadworks.jpg` | 800 × 560 |
| `service-architectural-design.jpg` | 800 × 560 |
| `service-design-and-build.jpg` | 800 × 560 |
| `service-interior-design.jpg` | 800 × 560 |
| `service-architectural-programming.jpg` | 800 × 560 |
| `service-construction-administration.jpg` | 800 × 560 |

## About page

| Filename | Used on | Target size |
| --- | --- | --- |
| `about-hero.jpg` | Shared inner-page hero background | 2000 × 900 |
| `about-ceo.jpg` | Leadership portrait | 760 × 900 |
| `about-stats-background.jpg` | Stats band background | 2000 × 700 |
| `brand-1.svg` … `brand-5.svg` | Trusted-by logo strip | 160 × 48 |

## Corporate Responsibility & Careers

| Filename | Target size |
| --- | --- |
| `responsibility-csr.jpg` | 1200 × 700 |
| `responsibility-diversity.jpg` | 1200 × 700 |
| `responsibility-sustainability.jpg` | 1200 × 700 |
| `careers-team.jpg` | 1200 × 700 |

## Adding a new image slot

1. Add an entry to `images` in `src/data/images.ts` (`src`, `alt`, `size`).
2. Render it with `<Img slot={images.yourKey} className="aspect-4/3 w-full" />`.

`<Img>` takes a `placeholder` prop controlling how the missing-file state is
drawn — `panel` (default, dashed box with filename and size), `compact`
(filename only, for small boxes like the logo strip), or `plain` (a flat
surface with no text, for images used as a background behind a colour wash).

## About the logo

The header and footer use an inline SVG mark (`src/components/ui/Logo.tsx`) so
the site never shows a broken logo. To use real artwork instead, drop
`logo.svg` here and replace the `<svg>` in that component with
`<Img slot={images.logo} />`.

## Map

`map-brisbane.jpg` is a static image placeholder used by both the home page's
Find Us band and the Contact page hero. To use a live embed instead, replace
the `<Img>` in `src/components/home/FindUs.tsx` with a Google Maps `<iframe>`.
