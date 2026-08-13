/**
 * Image manifest.
 *
 * The three `axis-*` files are the supplied photography. They are small
 * (236px wide), so they are only ever rendered in cards sized to suit —
 * never as a full-bleed background, where they would visibly soften.
 * Slots marked AWAITING ARTWORK render a labelled placeholder panel.
 */
export type ImageSlot = {
  src: string
  alt: string
  /** Actual size where artwork exists, target size where it does not. */
  size: string
}

export const images = {
  plant: {
    src: '/images/axis-plant.jpg',
    alt: 'Engineers in high-visibility gear at a process plant',
    size: '236 × 353',
  },
  offshore: {
    src: '/images/axis-offshore.jpg',
    alt: 'Offshore platform and crane above open water',
    size: '236 × 354',
  },
  mechanical: {
    src: '/images/axis-mechanical.jpg',
    alt: 'Crew assembling a pressure vessel and pipework',
    size: '236 × 295',
  },

  // AWAITING ARTWORK — wide crops for the full-bleed bands.
  heroWide: {
    src: '/images/axis-hero-wide.jpg',
    alt: 'Industrial facility at scale',
    size: '2400 × 1350',
  },
  aboutWide: {
    src: '/images/axis-about-wide.jpg',
    alt: 'Site team reviewing plant drawings',
    size: '1800 × 1200',
  },
  ctaWide: {
    src: '/images/axis-cta-wide.jpg',
    alt: 'Structural steel against an evening sky',
    size: '2400 × 900',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images
