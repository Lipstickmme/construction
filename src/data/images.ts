/**
 * Image manifest. Everything in `public/images/`.
 *
 * None of the first-iteration (AtlasBridge) photography is referenced any
 * more — every slot points either at the Axis rig set or at the newer
 * `new*`/`construction*` renders. Unfilled slots render a labelled
 * placeholder naming the file they want.
 *
 * The logos arrived as solid 1024² squares, which read as a filled box over
 * photography. Both were re-cut to transparent PNGs trimmed to the wordmark,
 * alpha taken from luminance so the antialiased edges survive.
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

  // Home hero — the widest asset available.
  heroWide: {
    src: '/images/rig1.png',
    alt: 'Offshore production platform and walkway over open sea',
    size: '1344 × 576',
  },

  // Page underlays, one per route so no two mastheads share a frame.
  underlayAbout: {
    src: '/images/newconstructionrenovation.png',
    alt: '',
    size: 'supplied',
  },
  underlayCapabilities: {
    src: '/images/mewconstructionsteelstructure.png',
    alt: '',
    size: 'supplied',
  },
  underlayProjects: {
    src: '/images/newcivilconstruction.png',
    alt: '',
    size: 'supplied',
  },
  underlayCareers: {
    src: '/images/newcareerimage.png',
    alt: '',
    size: 'supplied',
  },
  underlayContact: {
    src: '/images/newconstructioninterior_fitout.png',
    alt: '',
    size: 'supplied',
  },
  underlayCapability: {
    src: '/images/newconstructionproject.png',
    alt: '',
    size: 'supplied',
  },

  // Projects
  offshorePlatform: {
    src: '/images/rig2.png',
    alt: 'Offshore platform with cranes above the sea',
    size: '1024 × 1024',
  },
  rigMaintenance: {
    src: '/images/newconstructionrigmaintenance.png',
    alt: 'Maintenance crew working on rig equipment',
    size: 'supplied',
  },
  civilWorks: {
    src: '/images/newcivilconstruction.png',
    alt: 'Civil construction works in progress',
    size: 'supplied',
  },
  steelStructure: {
    src: '/images/mewconstructionsteelstructure.png',
    alt: 'Structural steel frame under erection',
    size: 'supplied',
  },
  roadwork: {
    src: '/images/construction_realistic_roadwork.png',
    alt: 'Roadworks under construction',
    size: 'supplied',
  },
  commercialBuilding: {
    src: '/images/constructionmercialbuilding.png',
    alt: 'Commercial building nearing completion',
    size: 'supplied',
  },

  // Sections
  approach: {
    src: '/images/newconstructionproject.png',
    alt: 'Construction project under way',
    size: 'supplied',
  },
  disciplines: {
    src: '/images/construction_realistic_roadwork.png',
    alt: 'Roadworks and civil infrastructure',
    size: 'supplied',
  },
  interiorFitout: {
    src: '/images/newconstructioninterior_fitout.png',
    alt: 'Interior fit-out in progress',
    size: 'supplied',
  },
  renovation: {
    src: '/images/newconstructionrenovation.png',
    alt: 'Renovation works on an existing structure',
    size: 'supplied',
  },
  careers: {
    src: '/images/newcareerimage.png',
    alt: 'Axis people from across the business',
    size: 'supplied',
  },
  gasFacility: {
    src: '/images/rig3.png',
    alt: 'Site walkdown at a gas-fired facility',
    size: '1024 × 1024',
  },
} as const satisfies Record<string, ImageSlot>

export type ImageKey = keyof typeof images
