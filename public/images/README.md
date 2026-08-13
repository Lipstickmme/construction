# Image drop folder

Drop artwork here using the **exact filename** a slot expects and it swaps
itself in on reload — no code change needed. Slots are declared in
`src/data/images.ts`; each unfilled one renders a placeholder panel printing
the filename and target size, so you can work straight from the browser.

## Wired up

These are in place and rendering.

| File | Used for |
| --- | --- |
| `logo-2.png` | Logo — header (light theme) |
| `logo-white.png` | Logo — footer, and header in dark theme |
| `ghf9LjrVg.jpg` | Services — Roadworks, Tunnels, Bridges, Drainage and Concrete Structures |
| `Architectural-Design.jpg` | Services — Architectural Design |
| `Design-and-Build.jpg` | Services — Design and Build |
| `Interior-Design-Service.jpg` | Services — Interior Design |
| `Architectural-programming.webp` | Services — Architectural Programming |
| `Construction-Administration.jpg` | Services — Construction Administration |
| `7bzbyafVTYg-.jpg` | Home rail — Civil Engineering |
| `3.jpg` | Home rail — First-class Interior Design and Remodelling |
| `iconbox-2.jpeg` | Home rail — Industrial Engineering And Construction |
| `Bridges-w7e7e.jpg` | Home rail — Concrete Structures |
| `k5l-zbRSPds.jpg` | Home — Sustainable Infrastructure Construction |
| `modern-city-infrastructure.jpg` | Home — Modern City Infrastructure Construction |
| `hero-bridge-wip.png` | Hero slide 1 — "Construction Solutions" |
| `hero-sd1.png` | Hero slide 2 — "Building your dreams." |
| `hero-img1.png` | Hero slide 3 — "Building the future." |
| `CSR-1024x569.jpg` | Corporate Responsibility — CSR |
| `sustainability-1028x464-1.jpg` | Corporate Responsibility — Sustainability |
| `careers.jpg` | Careers |

## Still needed

Name the file exactly as listed and it wires itself up.

### Home page

Nothing outstanding — every home-page slot is filled, and the map is a live
Google embed rather than an image.

### Other pages

| Filename | Used for | Target size |
| --- | --- | --- |
| `service-geology-mine-engineering.jpg` | Services — Geology and Mine Engineering | 800 × 560 |
| `responsibility-diversity.jpg` | Corporate Responsibility — Diversity & Inclusion | 1200 × 700 |
| `about-hero.jpg` | Shared inner-page hero background (About, Services, Careers, Corporate Responsibility) | 2000 × 900 |
| `about-ceo.jpg` | About — leadership portrait | 760 × 900 |
| `about-stats-background.jpg` | About — stats band background | 2000 × 700 |
| `brand-1.svg` … `brand-5.svg` | About — "Trusted by global brands" strip | 160 × 48 each |

`about-hero.jpg` is worth doing early: it's the background for every inner
page's hero band, so one file fixes five pages. The Contact page is the
exception — its hero is the live map.

## Adding a new image slot

1. Add an entry to `images` in `src/data/images.ts` (`src`, `alt`, `size`).
2. Render it with `<Img slot={images.yourKey} className="aspect-4/3 w-full" />`.

`<Img>` takes a `placeholder` prop controlling the missing-file state —
`panel` (default, dashed box with filename and size), `compact` (filename
only, for small boxes like the logo strip), or `plain` (a flat `--mist`
surface with no text, for images sitting under a colour wash).

## Map

The map is a live Google Maps embed (`src/components/ui/MapEmbed.tsx`), used
both by the home page's Find Us band and as the Contact page hero. It reads
the office address from `src/data/site.ts` and needs no API key. Swap the URL
for a Maps Embed API one if you want styling control or usage reporting.
