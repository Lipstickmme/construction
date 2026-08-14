/**
 * Image manifest. Everything in `public/images/`.
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

  // Home hero
  heroWide: {
    src: '/images/rig1.png',
    alt: 'Offshore production platform and walkway over open sea',
    size: '1344 × 576',
  },

  // Page-hero underlays — one per route, so no two mastheads share a frame.
  underlayAbout: {
    src: '/images/ceo-site.jpg',
    alt: '',
    size: '1280 × 956',
  },
  underlayCapabilities: {
    src: '/images/steel-structure.jpg',
    alt: '',
    size: '1920 × 1920',
  },
  underlayProjects: {
    src: '/images/civil-construction.jpg',
    alt: '',
    size: '1920 × 1920',
  },
  underlayCareers: {
    src: '/images/careers.jpg',
    alt: '',
    size: '1344 × 576',
  },
  underlayContact: {
    src: '/images/interior-fitout.jpg',
    alt: '',
    size: '1920 × 1920',
  },
  underlayCapability: {
    src: '/images/rig-maintenance.jpg',
    alt: '',
    size: '1920 × 1920',
  },

  // Projects
  offshorePlatform: {
    src: '/images/rig2.png',
    alt: 'Offshore platform with cranes above the sea',
    size: '1024 × 1024',
  },
  rigMaintenance: {
    src: '/images/rig-maintenance.jpg',
    alt: 'Maintenance crew working on rig equipment',
    size: '1920 × 1920',
  },
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
    alt: 'Roadworks under construction',
    size: '1920 × 1920',
  },
  interiorFitout: {
    src: '/images/interior-fitout.jpg',
    alt: 'Interior fit-out nearing completion',
    size: '1920 × 1920',
  },

  // Sections
  approach: {
    src: '/images/site-review.jpg',
    alt: 'Site team reviewing drawings on a build',
    size: '1280 × 930',
  },
  disciplines: {
    src: '/images/roadwork.jpg',
    alt: 'Roadworks and civil infrastructure',
    size: '1920 × 1920',
  },
  careers: {
    src: '/images/careers.jpg',
    alt: 'Axis people from across the business',
    size: '1344 × 576',
  },
  gasFacility: {
    src: '/images/rig3.png',
    alt: 'Site walkdown at a gas-fired facility',
    size: '1024 × 1024',
  },

  // Leadership
  ceo: {
    src: '/images/ceo.jpg',
    alt: 'Chief Executive Officer of Axis Construction',
    size: '1280 × 966',
  },
  ceoSite: {
    src: '/images/ceo-site.jpg',
    alt: 'Chief Executive Officer on site with drawings',
    size: '1280 × 956',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images
