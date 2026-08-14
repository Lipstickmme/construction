# Image folder

Slots are declared in `src/data/images.ts`. Every slot currently points at real
artwork — nothing is outstanding.

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

## Where each one is used

| File | Used for |
| --- | --- |
| `rig1.png` | Home hero underlay |
| `rig2.png` | Projects — Offshore Platform Works |
| `rig3.png` | Home — closing call to action |
| `ceo.jpg` | Home — leadership section |
| `ceo-site.jpg` | About page underlay |
| `site-review.jpg` | Home — approach block; About band |
| `roadwork.jpg` | Home — civil scope; Projects — Roadworks |
| `steel-structure.jpg` | Capabilities underlay; Structural Steel Erection |
| `civil-construction.jpg` | Projects underlay; Civil Infrastructure Works |
| `rig-maintenance.jpg` | Capability page underlay; Rig Maintenance |
| `interior-fitout.jpg` | Contact underlay; Commercial Interior Fit-out |
| `careers.jpg` | Careers underlay and band |
| `axis-logo-light.png` | Logo on dark backgrounds |
| `axis-logo-dark.png` | Logo on light backgrounds |

Three files named in an earlier list never arrived — `newconstructionproject`,
`constructionmercialbuilding` and `newconstructionrenovation`. Their slots were
repointed at the images that did land, so nothing renders a placeholder.
