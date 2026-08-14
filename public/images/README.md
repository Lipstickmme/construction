# Image folder

Slots are declared in `src/data/images.ts` — one slot per file, no aliases.
Every slot is referenced by at least one component, and every file here has a
slot. Nothing is outstanding and nothing is orphaned.

## Optimisation

The supplied renders arrived as 1920² PNGs of 7–9MB each — about **38MB in
total**, which would have made the site unusable on anything but a fast
connection. They are re-encoded as progressive JPEG at quality 82: visually
identical at these sizes, **~3.9MB total, 90% smaller**.

They were also renamed off the supplied filenames, two of which carried
typos (`mewconstructionsteelstructure`, `constructionmercialbuilding`).

| Supplied | Now | Size |
| --- | --- | --- |
| `construction_realistic_roadwork.png` | `roadwork.jpg` | 8.7MB → 859KB |
| `mewconstructionsteelstructure.png` | `steel-structure.jpg` | 6.9MB → 551KB |
| `newcivilconstruction.png` | `civil-construction.jpg` | 7.7MB → 764KB |
| `newconstructioninterior_fitout.png` | `interior-fitout.jpg` | 6.9MB → 584KB |
| `newconstructionrigmaintenance.png` | `rig-maintenance.jpg` | 7.7MB → 703KB |
| `newcareerimage.png` | `careers.jpg` | 1.2MB → 121KB |
| `ceo.jpg` | `ceo.jpg` | portrait |
| `newconstruct.jpg` | `site-review.jpg` | team reviewing drawings |
| `newconstructwe.jpg` | `ceo-site.jpg` | CEO on site |

The three rig renders (`rig1`–`rig3`) predate this pass and are still PNG.

## Where each one is used

Each of the eight capability pages takes the same photograph as its matching
project card, so a discipline reads the same wherever it appears.

| File | Slot | Used for |
| --- | --- | --- |
| `rig1.png` | `rigHero` | Home hero underlay |
| `rig2.png` | `offshorePlatform` | Offshore & Marine masthead; Offshore Platform Works |
| `rig3.png` | `gasFacility` | Projects masthead; Oil & Gas Facilities masthead; home call to action |
| `rig-maintenance.jpg` | `rigMaintenance` | Mechanical & Piping masthead; Rig Maintenance Campaign |
| `steel-structure.jpg` | `steelStructure` | Capabilities masthead; Structural Steel & Concrete masthead; Structural Steel Erection |
| `civil-construction.jpg` | `civilWorks` | Geology & Mine Engineering masthead; About band; Civil Infrastructure Works |
| `roadwork.jpg` | `roadwork` | Roadworks/Tunnels/Bridges masthead; home civil scope; Highway & Access Roadworks |
| `interior-fitout.jpg` | `interiorFitout` | Contact masthead; Architectural Design & Build masthead; Commercial Interior Fit-out |
| `site-review.jpg` | `siteReview` | Careers masthead; Construction Administration masthead; home approach block |
| `careers.jpg` | `careers` | Careers band |
| `ceo.jpg` | `ceo` | Home leadership section |
| `ceo-site.jpg` | `ceoSite` | About masthead |
| `axis-logo-light.png` | `logoLight` | Logo on dark backgrounds |
| `axis-logo-dark.png` | `logoDark` | Logo on light backgrounds |

Three files named in an earlier list never arrived — `newconstructionproject`,
`constructionmercialbuilding` and `newconstructionrenovation`. Their slots were
repointed at the images that did land, so nothing renders a placeholder.
