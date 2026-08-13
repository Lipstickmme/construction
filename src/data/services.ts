import type { OfferingIconName } from '@/components/ui/Icon'
import { images, type ImageSlot } from './images'

/**
 * Canonical service list. This is the single source of truth for the Services
 * page grid and the SERVICES dropdown in the main nav — add a service here and
 * it appears in both.
 */
export type Service = {
  id: string
  title: string
  /** Short label used in the nav dropdown, where the full title is too long. */
  navLabel: string
  excerpt: string
  image: ImageSlot
  /** Overlaid on the feature image on the service's own page. */
  tagline: string
}

export const services: Service[] = [
  {
    id: 'roadworks',
    title: 'Roadworks, Tunnels, Bridges, Drainage and Concrete Structures',
    navLabel: 'Roadworks, Tunnels & Bridges',
    excerpt:
      'We provide a variety of structural engineering services for industrial, commercial and institutional owners.',
    image: images.serviceRoadworks,
    tagline:
      'Structural engineering for industrial, commercial and institutional owners.',
  },
  {
    id: 'architectural-design',
    title: 'Architectural Design',
    navLabel: 'Architectural Design',
    excerpt:
      "From initial concept drawings that sketch out an artist's impression of what your home will look like post-build to three-dimensional modelling of the finished scheme.",
    image: images.serviceArchitecturalDesign,
    tagline:
      'From an artist’s first impression through to three-dimensional modelling of the finished scheme.',
  },
  {
    id: 'design-and-build',
    title: 'Design and Build',
    navLabel: 'Design and Build',
    excerpt:
      'An innovative concept for home-owners who want to add extra space to their existing home, either by doing house extensions or loft conversions.',
    image: images.serviceDesignAndBuild,
    tagline:
      'Extra space in your existing home, through extensions or loft conversions.',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    navLabel: 'Interior Design',
    excerpt:
      'Interior design helps to enhance the interior of a building by achieving a more aesthetically pleasing environment for the people using the space.',
    image: images.serviceInteriorDesign,
    tagline:
      'Building by achieving a more aesthetically pleasing environment for the people using the space.',
  },
  {
    id: 'architectural-programming',
    title: 'Architectural Programming',
    navLabel: 'Architectural Programming',
    excerpt:
      'Research and decision-making process that helps to identify the scope of work to be designed and performed.',
    image: images.serviceArchitecturalProgramming,
    tagline:
      'Identifying the scope of work to be designed and performed, before design begins.',
  },
  {
    id: 'construction-administration',
    title: 'Construction Administration',
    navLabel: 'Construction Administration',
    excerpt:
      'Takes place after the design has been completed, all drawings have been completed and approved by the local building department and construction begins.',
    image: images.serviceConstructionAdministration,
    tagline:
      'Oversight from the first pour to handover, once the drawings are approved.',
  },
  {
    id: 'geology-and-mine-engineering',
    title: 'Geology and Mine Engineering',
    navLabel: 'Geology and Mine Engineering',
    excerpt:
      'Ground investigation, resource assessment and mine design — the geotechnical groundwork that tells you what can safely be built, and how.',
    image: images.serviceGeology,
    tagline:
      'The geotechnical groundwork that tells you what can safely be built, and how.',
  },
]

export type ServiceCard = {
  id: string
  tag: string
  title: string
  image: ImageSlot
}

/** The horizontally scrolling rail in the dark "Public and private" section. */
export const serviceCards: ServiceCard[] = [
  {
    id: 'civil-engineering',
    tag: 'Construction',
    title: 'Civil Engineering',
    image: images.railCivilEngineering,
  },
  {
    id: 'interior-design',
    tag: 'Interior Design',
    title: 'First-class Interior Design and Remodelling',
    image: images.railInteriorDesign,
  },
  {
    id: 'industrial-engineering',
    tag: 'Construction',
    title: 'Industrial Engineering And Construction',
    image: images.railIndustrial,
  },
  {
    id: 'concrete-structures',
    tag: 'Construction',
    title: 'Concrete Structures',
    image: images.railConcrete,
  },
]

export type Offering = {
  id: string
  icon: OfferingIconName
  title: string
  description: string
  badge?: string
}

/** The three cards under "Transforming Visions into Iconic Structures." */
export const offerings: Offering[] = [
  {
    id: 'roadworks',
    icon: 'crane',
    title: 'Roadworks, Tunnels, Bridges, Drainage and Concrete Structures',
    description:
      'AtlasBridge Construction offers a range of services related to roadworks, tunnels, bridges, drainage, and concrete structures.',
  },
  {
    id: 'architectural-design',
    icon: 'blueprint',
    title: 'Architectural Design',
    description:
      'From initial concept drawings that sketch out an artist’s impression of what your home will look like post-build to three-dimensional modelling...',
    badge: 'Offer',
  },
  {
    id: 'general-contractor',
    icon: 'helmet',
    title: 'General Contractor',
    description:
      "We're one-stop general contractor who can oversee and simplify the entire project process from inspection, design, approval to construction.",
  },
]

/** Checklist beside the sustainable-construction image. */
export const capabilities: string[] = [
  'Pre-Construction Services',
  'Historic Restoration',
  'Infrastructure Solutions',
  'General Contractor',
  'Commercial and Industrial Engineering',
]

export type ProcessStep = {
  step: string
  label: string
}

export const processSteps: ProcessStep[] = [
  { step: '1', label: 'Offering construction plans' },
  { step: '2', label: 'Building the project' },
  { step: '3', label: 'Project assignment' },
]

export type Discipline = {
  id: string
  title: string
  body: string
}

/** Accordion in the "Modern City Infrastructure Construction" section. */
export const disciplines: Discipline[] = [
  {
    id: 'roadworks',
    title: 'Roadworks',
    body: 'AtlasBridge Construction specializes in roadworks, which involve the design and construction of roads and highways. This includes activities such as site preparation, grading, pavement construction, signage installation, and road marking. We have the expertise to handle various types of road projects, ranging from small local roads to large-scale highways.',
  },
  {
    id: 'tunnels',
    title: 'Tunnels',
    body: 'Tunnelling work covers geotechnical investigation, excavation, lining and ventilation. We plan each drive around the ground conditions on site, keeping surface disruption and settlement within agreed limits for road, rail and utility crossings.',
  },
  {
    id: 'bridges',
    title: 'Bridges',
    body: 'From footbridges to multi-span highway crossings, we handle foundations, piers, decks and bearings. Our engineers model load paths and construction sequencing up front so staging, lifting and traffic management are settled before work begins.',
  },
  {
    id: 'drainage',
    title: 'Drainage',
    body: 'Stormwater and subsurface drainage designed around the catchment it serves — culverts, pits, pipework and retention systems that keep pavements sound and sites workable through the wet season.',
  },
  {
    id: 'concrete-structures',
    title: 'Concrete Structures',
    body: 'Reinforced and post-tensioned concrete for frames, retaining walls, slabs and marine structures. Mix design, formwork and curing are controlled on site, with testing at every pour to hold the specified strength and finish.',
  },
]
