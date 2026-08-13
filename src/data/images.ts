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

  // Home — hero slider
  hero1: {
    src: '/images/hero-bridge-wip.png',
    alt: 'Bridge under construction',
    size: '1584 × 672',
  },
  hero2: {
    src: '/images/hero-sd1.png',
    alt: 'Construction site at work',
    size: '1584 × 672',
  },
  hero3: {
    src: '/images/hero-img1.png',
    alt: 'Completed infrastructure project',
    size: '1376 × 768',
  },

  // Home — sections
  sustainable: {
    src: '/images/k5l-zbRSPds.jpg',
    alt: 'Excavator working on a site under a dramatic sky',
    size: '1920 × 1280',
  },
  infrastructure: {
    src: '/images/modern-city-infrastructure.jpg',
    alt: 'Tower cranes above a steel frame high-rise',
    size: '1024 × 1536',
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

  // Shared inner-page hero band — every page but Contact, which uses the map.
  pageHero: {
    src: '/images/hero-sd1.png',
    alt: '',
    size: '1584 × 672',
  },

  // About page
  aboutFeature: {
    // AWAITING ARTWORK
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

} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images

/** Logo strip under "Trusted by global brands", in the reference's order. */
export const brandLogos: ImageSlot[] = [
  { src: '/images/11.png', alt: 'Houzz', size: '160 × 48' },
  { src: '/images/22.png', alt: 'MyBuilder.com', size: '160 × 48' },
  { src: '/images/logitech-2-1.svg', alt: 'Logitech', size: '160 × 48' },
  { src: '/images/44.png', alt: 'Rated People', size: '160 × 48' },
  { src: '/images/66.png', alt: 'Zurich', size: '160 × 48' },
]
