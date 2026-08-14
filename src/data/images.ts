/**
 * Image manifest. Everything in `public/images/`.
 *
 * One slot per file — page mastheads point straight at the photograph they
 * want rather than at a parallel set of `underlay*` aliases, so there is no
 * second place to keep in sync when a picture changes.
 *
 * The supplied renders arrived as 1920² PNGs of 7–9MB each, ~38MB in total,
 * which would have made the site unusable on anything but a fast connection.
 * They are re-encoded as progressive JPEG at quality 82 — visually identical
 * at these sizes, ~90% smaller — and renamed off filenames that carried
 * typos (`mewconstruction…`, `constructionmercial…`).
 *
 * The logos arrived as solid 1024² squares, which read as a filled box over
 * photography; both were re-cut to transparent PNGs trimmed to the wordmark.
 */
export type ImageSlot = {
  src: string
  alt: string
  size: string
}

export const images = {
  logoDark: {
    src: '/images/axis-logo-dark.png',
    alt: 'Axis Construction',
    size: '727 × 302',
  },
  logoLight: {
    src: '/images/axis-logo-light.png',
    alt: 'Axis Construction',
    size: '728 × 305',
  },

  // Oil and gas
  rigHero: {
    src: '/images/rig1.png',
    alt: 'Offshore production platform and walkway over open sea',
    size: '1344 × 576',
  },
  offshorePlatform: {
    src: '/images/rig2.png',
    alt: 'Offshore platform with cranes above the sea',
    size: '1024 × 1024',
  },
  gasFacility: {
    src: '/images/rig3.png',
    alt: 'Gas-fired process facility at dusk',
    size: '1024 × 1024',
  },
  rigMaintenance: {
    src: '/images/rig-maintenance.jpg',
    alt: 'Maintenance crew working on rig equipment',
    size: '1920 × 1920',
  },

  // Civil, structural and building
  civilWorks: {
    src: '/images/civil-construction.jpg',
    alt: 'Civil construction works in progress',
    size: '1920 × 1920',
  },
  steelStructure: {
    src: '/images/steel-structure.jpg',
    alt: 'Structural steel frame under erection',
    size: '1920 × 1920',
  },
  roadwork: {
    src: '/images/roadwork.jpg',
    alt: 'Roadworks and civil infrastructure under construction',
    size: '1920 × 1920',
  },
  interiorFitout: {
    src: '/images/interior-fitout.jpg',
    alt: 'Interior fit-out nearing completion',
    size: '1920 × 1920',
  },

  // People
  siteReview: {
    src: '/images/site-review.jpg',
    alt: 'Site team reviewing drawings on a build',
    size: '1280 × 930',
  },
  careers: {
    src: '/images/careers.jpg',
    alt: 'Axis people from across the business',
    size: '1344 × 576',
  },
  ceo: {
    src: '/images/ceo.jpg',
    alt: 'Christopher Wojcik, Chief Executive Officer of Axis Construction',
    size: '1280 × 966',
  },
  ceoSite: {
    src: '/images/ceo-site.jpg',
    alt: 'Christopher Wojcik on site with drawings',
    size: '1280 × 956',
  },
} as const satisfies Record<string, ImageSlot>
