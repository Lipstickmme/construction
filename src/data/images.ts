/**
 * Central manifest of every image slot on the site.
 *
 * Slots marked "AWAITING ARTWORK" have no file yet and render a labelled
 * placeholder panel (see `src/components/ui/Img.tsx`) naming the file they
 * want. Drop a matching file into `public/images/` and it appears on reload.
 * `public/images/README.md` lists what is still outstanding.
 */
export type ImageSlot = {
  /** Path served from `public/`. */
  src: string
  /** Default alt text. Override per usage when the context needs it. */
  alt: string
  /** Actual size where artwork exists, target size where it doesn't. */
  size: string
}

export const images = {
  logo: {
    src: '/images/logo-2.png',
    alt: 'AtlasBridge Construction',
    size: '2080 × 600',
  },
  logoLight: {
    src: '/images/logo-white.png',
    alt: 'AtlasBridge Construction',
    size: '300 × 87',
  },

  // Home — hero slider. AWAITING ARTWORK (needs wide landscape shots).
  hero1: {
    src: '/images/hero-bridge-wip.jpg',
    alt: 'Bridge under construction',
    size: '2700 × 1800',
  },
  hero2: {
    src: '/images/hero-sd1.jpg',
    alt: 'Construction site at work',
    size: '2700 × 1800',
  },
  hero3: {
    src: '/images/hero-img1.jpg',
    alt: 'Completed infrastructure project',
    size: '2700 × 1800',
  },

  // Home — sections
  sustainable: {
    src: '/images/k5l-zbRSPds.jpg',
    alt: 'Excavator working on a site under a dramatic sky',
    size: '1920 × 1280',
  },
  infrastructure: {
    // AWAITING ARTWORK — portrait crop, sits beside the accordion.
    src: '/images/infrastructure-cranes.jpg',
    alt: 'Tower cranes above a steel frame high-rise',
    size: '900 × 1100',
  },
  map: {
    // AWAITING ARTWORK — also used as the Contact page hero.
    src: '/images/map-brisbane.jpg',
    alt: 'Map showing the AtlasBridge office at 40 Creek St, Brisbane',
    size: '2400 × 700',
  },

  // Home — services rail
  railCivilEngineering: {
    src: '/images/7bzbyafVTYg-.jpg',
    alt: 'Aerial view of a reinforced concrete floor under construction',
    size: '1920 × 1268',
  },
  railInteriorDesign: {
    src: '/images/3.jpg',
    alt: 'Contemporary kitchen with high-gloss cabinetry',
    size: '2560 × 1000',
  },
  railIndustrial: {
    src: '/images/iconbox-2.jpeg',
    alt: 'Steel fixers tying reinforcement at sunset',
    size: '740 × 722',
  },
  railConcrete: {
    src: '/images/Bridges-w7e7e.jpg',
    alt: 'Steel girders of a highway bridge seen from below',
    size: '1024 × 521',
  },
  railRestoration: {
    // AWAITING ARTWORK
    src: '/images/rail-historic-restoration.jpg',
    alt: 'Scaffolding against a restored heritage facade',
    size: '800 × 900',
  },

  // Services page
  serviceRoadworks: {
    src: '/images/ghf9LjrVg.jpg',
    alt: 'Site team on a post-tensioned deck ahead of a pour',
    size: '1920 × 1280',
  },
  serviceArchitecturalDesign: {
    src: '/images/Architectural-Design.jpg',
    alt: 'Hand sketching an architectural rendering',
    size: '2000 × 966',
  },
  serviceDesignAndBuild: {
    src: '/images/Design-and-Build.jpg',
    alt: 'Glazed extension opening onto a garden',
    size: '1920 × 1000',
  },
  serviceInteriorDesign: {
    src: '/images/Interior-Design-Service.jpg',
    alt: 'Living room with warm natural light',
    size: '1024 × 704',
  },
  serviceArchitecturalProgramming: {
    src: '/images/Architectural-programming.webp',
    alt: 'Team reviewing plans around a studio table',
    size: 'webp',
  },
  serviceConstructionAdministration: {
    src: '/images/Construction-Administration.jpg',
    alt: 'Supervisor reviewing progress on an active site',
    size: '1232 × 822',
  },
  serviceGeology: {
    // AWAITING ARTWORK
    src: '/images/service-geology-mine-engineering.jpg',
    alt: 'Geologist logging core samples at a mine site',
    size: '800 × 560',
  },

  // About page — all AWAITING ARTWORK
  aboutHero: {
    src: '/images/about-hero.jpg',
    alt: 'Glass towers seen from below',
    size: '2000 × 900',
  },
  aboutFeature: {
    src: '/images/about-ceo.jpg',
    alt: 'Andreas Wojcik, Chief Executive Officer',
    size: '760 × 900',
  },
  aboutStats: {
    src: '/images/about-stats-background.jpg',
    alt: '',
    size: '2000 × 700',
  },

  // Corporate Responsibility
  responsibilityCsr: {
    src: '/images/CSR-1024x569.jpg',
    alt: 'Corporate social responsibility',
    size: '1024 × 569',
  },
  responsibilityDiversity: {
    // AWAITING ARTWORK
    src: '/images/responsibility-diversity.jpg',
    alt: 'Illustration of a diverse group of people standing together',
    size: '1200 × 700',
  },
  responsibilitySustainability: {
    src: '/images/sustainability-1028x464-1.jpg',
    alt: 'Many hands cupping soil with a seedling growing from it',
    size: '695 × 464',
  },

  // Careers
  careersTeam: {
    src: '/images/careers.jpg',
    alt: 'AtlasBridge team members from across the business',
    size: '1000 × 417',
  },

  // Latest News — all AWAITING ARTWORK
  newsOne: {
    src: '/images/news-1.jpg',
    alt: 'Bridge deck under replacement at night',
    size: '800 × 560',
  },
  newsTwo: {
    src: '/images/news-2.jpg',
    alt: 'Concrete pour in progress',
    size: '800 × 560',
  },
  newsThree: {
    src: '/images/news-3.jpg',
    alt: 'Apprentices on site with a supervising engineer',
    size: '800 × 560',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images

/** Logo strip under "Trusted by global brands". All AWAITING ARTWORK. */
export const brandLogos: ImageSlot[] = [
  { src: '/images/brand-1.svg', alt: 'Houzz', size: '160 × 48' },
  { src: '/images/brand-2.svg', alt: 'MyBuilder.com', size: '160 × 48' },
  { src: '/images/brand-3.svg', alt: 'Logitech', size: '160 × 48' },
  { src: '/images/brand-4.svg', alt: 'Naked People', size: '160 × 48' },
  { src: '/images/brand-5.svg', alt: 'Zurich', size: '160 × 48' },
]
