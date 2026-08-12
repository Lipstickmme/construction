/**
 * Central manifest of every image slot on the site.
 *
 * Nothing here ships with a real file yet — drop your own artwork into
 * `public/images/` using the exact `src` filename below and it appears
 * automatically. Until then each slot renders a labelled placeholder panel
 * (see `src/components/ui/Img.tsx`) showing the filename and target size.
 */
export type ImageSlot = {
  /** Path served from `public/` — drop a file here with this exact name. */
  src: string
  /** Default alt text. Override per usage when the context needs it. */
  alt: string
  /** Recommended export size, shown on the placeholder panel. */
  size: string
}

export const images = {
  logo: {
    src: '/images/logo.svg',
    alt: 'AtlasBridge Construction',
    size: '240 × 64',
  },
  logoLight: {
    src: '/images/logo-light.svg',
    alt: 'AtlasBridge Construction',
    size: '240 × 64',
  },

  // Home — hero slider (three slides, matching the reference)
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
  sustainable: {
    src: '/images/sustainable-excavator.jpg',
    alt: 'Excavator working on a site under a dramatic sky',
    size: '1000 × 760',
  },
  infrastructure: {
    src: '/images/infrastructure-cranes.jpg',
    alt: 'Tower cranes above a steel frame high-rise',
    size: '900 × 1100',
  },
  map: {
    src: '/images/map-brisbane.jpg',
    alt: 'Map showing the AtlasBridge office at 40 Creek St, Brisbane',
    size: '2400 × 700',
  },

  // Home — services rail
  railCivilEngineering: {
    src: '/images/rail-civil-engineering.jpg',
    alt: 'Workers assembling reinforcement steel',
    size: '800 × 900',
  },
  railInteriorDesign: {
    src: '/images/rail-interior-design.jpg',
    alt: 'Finished kitchen interior with dark cabinetry',
    size: '800 × 900',
  },
  railIndustrial: {
    src: '/images/rail-industrial-engineering.jpg',
    alt: 'Site engineer in high-visibility gear at golden hour',
    size: '800 × 900',
  },
  railConcrete: {
    src: '/images/rail-concrete-structures.jpg',
    alt: 'Steel roof truss structure seen from below',
    size: '800 × 900',
  },
  railRestoration: {
    src: '/images/rail-historic-restoration.jpg',
    alt: 'Scaffolding against a restored heritage facade',
    size: '800 × 900',
  },

  // Services page
  serviceRoadworks: {
    src: '/images/service-roadworks.jpg',
    alt: 'Site team reviewing plans on a large roadworks project',
    size: '800 × 560',
  },
  serviceArchitecturalDesign: {
    src: '/images/service-architectural-design.jpg',
    alt: 'Hand sketching an architectural rendering of a house',
    size: '800 × 560',
  },
  serviceDesignAndBuild: {
    src: '/images/service-design-and-build.jpg',
    alt: 'Glazed kitchen extension opening onto a garden',
    size: '800 × 560',
  },
  serviceInteriorDesign: {
    src: '/images/service-interior-design.jpg',
    alt: 'Living room with fireplace and warm natural light',
    size: '800 × 560',
  },
  serviceArchitecturalProgramming: {
    src: '/images/service-architectural-programming.jpg',
    alt: 'Team reviewing a scale model around a studio table',
    size: '800 × 560',
  },
  serviceConstructionAdministration: {
    src: '/images/service-construction-administration.jpg',
    alt: 'Supervisor with a laptop overlooking an active site',
    size: '800 × 560',
  },
  serviceGeology: {
    src: '/images/service-geology-mine-engineering.jpg',
    alt: 'Geologist logging core samples at a mine site',
    size: '800 × 560',
  },

  // About page
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
    src: '/images/responsibility-csr.jpg',
    alt: 'Corporate social responsibility illustration',
    size: '1200 × 700',
  },
  responsibilityDiversity: {
    src: '/images/responsibility-diversity.jpg',
    alt: 'Illustration of a diverse group of people standing together',
    size: '1200 × 700',
  },
  responsibilitySustainability: {
    src: '/images/responsibility-sustainability.jpg',
    alt: 'Many hands cupping soil with a seedling growing from it',
    size: '1200 × 700',
  },

  // Latest News
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

  // Careers
  careersTeam: {
    src: '/images/careers-team.jpg',
    alt: 'AtlasBridge team members from across the business',
    size: '1200 × 700',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images

/** Logo strip under "Trusted by global brands" — mono SVGs work best. */
export const brandLogos: ImageSlot[] = [
  { src: '/images/brand-1.svg', alt: 'Houzz', size: '160 × 48' },
  { src: '/images/brand-2.svg', alt: 'MyBuilder.com', size: '160 × 48' },
  { src: '/images/brand-3.svg', alt: 'Logitech', size: '160 × 48' },
  { src: '/images/brand-4.svg', alt: 'Naked People', size: '160 × 48' },
  { src: '/images/brand-5.svg', alt: 'Zurich', size: '160 × 48' },
]
