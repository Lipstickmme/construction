# Image drop folder

Slots are declared in `src/data/images.ts`. Nothing is outstanding — every
slot currently points at real artwork.

## Logos

The supplied logos arrived as solid 1024² squares: `axisblack.png` was white
lettering on black, `axiswhite logo.png` black lettering on white. A filled
square reads as a black or white box wherever it sits over photography, and a
CSS blend mode cannot fix it in the header because the fixed header forms its
own stacking context.

Both were re-cut to transparent PNGs, trimmed to the wordmark, with alpha
taken from luminance so the antialiased edges survive:

| File | Lettering | Use on |
| --- | --- | --- |
| `axis-logo-light.png` | Light | Dark backgrounds — hero, drawer, footer |
| `axis-logo-dark.png` | Dark | Light backgrounds — scrolled header |

## In use

| File | Used for | Size |
| --- | --- | --- |
| `rig1.png` | Home hero underlay | 1344 × 576 |
| `rig2.png` | Projects — Offshore Platform Works | 1024 × 1024 |
| `rig3.png` | Projects — Gas Facility Walkdown | 1024 × 1024 |
| `ghf9LjrVg.jpg` | Projects — Post-Tensioned Deck Pour | 1920 × 1280 |
| `k5l-zbRSPds.jpg` | Projects — Bulk Earthworks; home CTA band | 1920 × 1280 |
| `7bzbyafVTYg-.jpg` | Projects — Reinforced Structural Frame | 1920 × 1268 |
| `modern-city-infrastructure.jpg` | Projects — High-Rise Frame Erection | 1024 × 1536 |
| `Design-and-Build.jpg` | Home — Our approach; About band | 1920 × 1000 |
| `Construction-Administration.jpg` | Home — Civil scope accordion | 1232 × 822 |
| `Architectural-Design.jpg` | Available for Design & Build content | 2000 × 966 |
| `careers.jpg` | Careers | 1000 × 417 |

## Retired

`axis-plant.jpg`, `axis-offshore.jpg` and `axis-mechanical.jpg` are the
earlier supplied thumbnails at 236px wide. They were too soft to hold a card
and have been replaced by the full-resolution photography above. They remain
in the folder but are no longer referenced.
