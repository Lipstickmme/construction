/**
 * Image manifest. Everything in `public/images/`.
 *
 * The supplied logos arrived as solid 1024² squares — white-on-black and
 * black-on-white — which show as a filled box over photography. Both have
 * been re-cut to transparent PNGs, trimmed to the wordmark, with alpha taken
 * from luminance so the antialiased edges survive:
 *   `axis-logo-light` — light lettering, for dark backgrounds
 *   `axis-logo-dark`  — dark lettering, for light backgrounds
 */
export type ImageSlot = {
  src: string
  alt: string
  /** Actual size where artwork exists, target size where it does not. */
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

  // Home hero — wide offshore platform, the widest asset we have.
  heroWide: {
    src: '/images/rig1.png',
    alt: 'Offshore production platform and walkway over open sea',
    size: '1344 × 576',
  },

  // Projects
  offshorePlatform: {
    src: '/images/rig2.png',
    alt: 'Offshore platform with cranes above the sea',
    size: '1024 × 1024',
  },
  powerPlant: {
    src: '/images/rig3.png',
    alt: 'Site walkdown at a gas-fired power facility',
    size: '1024 × 1024',
  },
  concreteDeck: {
    src: '/images/ghf9LjrVg.jpg',
    alt: 'Site team on a post-tensioned deck ahead of a pour',
    size: '1920 × 1280',
  },
  earthworks: {
    src: '/images/k5l-zbRSPds.jpg',
    alt: 'Excavator working a site under a dramatic sky',
    size: '1920 × 1280',
  },
  civilAerial: {
    src: '/images/7bzbyafVTYg-.jpg',
    alt: 'Aerial view of a reinforced concrete floor under construction',
    size: '1920 × 1268',
  },
  towerCranes: {
    src: '/images/modern-city-infrastructure.jpg',
    alt: 'Tower cranes above a steel frame high-rise',
    size: '1024 × 1536',
  },

  // Sections
  approach: {
    src: '/images/Design-and-Build.jpg',
    alt: 'Completed building envelope opening onto its surroundings',
    size: '1920 × 1000',
  },
  disciplines: {
    src: '/images/Construction-Administration.jpg',
    alt: 'Supervisor reviewing progress on an active site',
    size: '1232 × 822',
  },
  designBuild: {
    src: '/images/Architectural-Design.jpg',
    alt: 'Hand sketching an architectural rendering',
    size: '2000 × 966',
  },
  geology: {
    src: '/images/Geology-and-Mine-Engineering.jpg',
    alt: 'Geological survey work at a mine site',
    size: '920 × 500',
  },
  careers: {
    src: '/images/careers.jpg',
    alt: 'Axis people from across the business',
    size: '1000 × 417',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images
