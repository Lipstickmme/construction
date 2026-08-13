import type { OfferingIconName } from '@/components/ui/Icon'
import { images, type ImageSlot } from './images'

/**
 * Canonical service list. This is the single source of truth for the Services
 * page grid and the SERVICES dropdown in the main nav — add a service here and
 * it appears in both.
 */
export type ServiceBullet = {
  term: string
  text: string
}

export type Service = {
  id: string
  title: string
  /** Short label used in the nav dropdown, where the full title is too long. */
  navLabel: string
  excerpt: string
  image: ImageSlot
  /** Overlaid on the feature image on the service's own page. */
  tagline: string
  /** Heading above the body copy on that page. */
  detailHeading: string
  detailBody: string[]
  detailBullets?: ServiceBullet[]
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
    detailHeading: 'Roadworks, Tunnels, Bridges, Drainage and Concrete Structures',
    detailBody: [
      'AtlasBridge Construction offers a range of services related to roadworks, tunnels, bridges, drainage and concrete structures. We handle the design and construction of roads and highways, covering site preparation, grading, pavement construction, signage installation and road marking, on projects ranging from small local roads to large-scale highways.',
      'Tunnelling work covers geotechnical investigation, excavation, lining and ventilation, planned around the ground conditions on site so surface disruption and settlement stay within agreed limits. Our bridge work runs from footbridges to multi-span highway crossings, with load paths and construction sequencing modelled up front so staging, lifting and traffic management are settled before work begins.',
      'Drainage is designed around the catchment it serves — culverts, pits, pipework and retention systems that keep pavements sound and sites workable through the wet season. Concrete structures are delivered in reinforced and post-tensioned form, with mix design, formwork and curing controlled on site and testing at every pour.',
    ],
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
    detailHeading: 'On-demand Architectural Design',
    detailBody: [
      'From initial concept drawings that sketch out an artist’s impression of what your building will look like post-build, to three-dimensional modelling of the finished scheme, our architectural design service takes a brief and turns it into something that can actually be priced and built.',
      'The drawing set covers everything the build depends on: existing and proposed plans for the planning application, building regulation drawings, structural drawings for the construction team, and detailed joinery and fittings drawings — enough to give you a clear picture of how the building will be put together before anyone breaks ground.',
    ],
    detailBullets: [
      {
        term: 'Project Inception',
        text: 'The stage where the planning of a project starts. Working together with the architect, the client learns their project needs, ideas and goals.',
      },
      {
        term: 'Schematic Design',
        text: 'The architect begins proposing preliminary design solutions and concepts based on the client’s requirements and budget, and reviews them together.',
      },
      {
        term: 'Design Development',
        text: 'Once a schematic design is agreed upon and there is a clearer definition of the scope and quality of the finished project, the design development phase begins.',
      },
      {
        term: 'Construction Documents',
        text: 'A continuation of the design development phase. Drawings and specifications are developed after design concepts have been detailed, ready to build and price from.',
      },
      {
        term: 'Bidding and Negotiation',
        text: 'Contractors submit bids against the documents. The architect helps evaluate them and advises on selecting the right team for the work.',
      },
      {
        term: 'Construction and Contract Administration',
        text: 'The architect consults with the client and advises during construction, checking that what is built matches what was drawn and specified.',
      },
    ],
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
    detailHeading: 'Design and Build Service',
    detailBody: [
      'Design and Build service is an innovative concept for home-owners who want to add extra space to their existing home, either by doing house extensions or loft conversions. It has many benefits, including more accessible communication with architects and building specialists, as well as saving you time.',
      'Our award-winning architects and qualified structural engineers have years of experience designing all types of single and double-storey home extensions for new and period properties. Our Design services include planning, architectural and structural drawings and obtaining planning permission.',
      'If you decide to go ahead with our company to complete the build, our builders extensions specialist will take care of the projects from start to finish. Our dedicated project manager will keep you updated throughout the whole process and will answer any questions you might have. Our Design and Build contractors work hard to turn your vision into reality with minimal disruption to your daily life.',
    ],
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
    detailHeading: 'Interior Design Service',
    detailBody: [
      'Interior design helps to enhance the interior of a building by achieving a more aesthetically pleasing environment for the people using the space. It is the art and science of understanding how people behave in a room, then shaping that room around them.',
      'Our designers work from the structure outwards — light, circulation and proportion first, then finishes, joinery and furniture. Because the design team sits alongside the engineers and the site team, what gets drawn is what can be built, and changes are caught on paper rather than on site.',
      'We work on single rooms, whole-house remodelling and commercial fit-outs, and we are happy to come in at any stage: at concept, once the shell is up, or to rescue a scheme that has stalled.',
    ],
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
    detailHeading: 'Architectural Programming',
    detailBody: [
      'Architectural programming is the research and decision-making process that helps to identify the scope of work to be designed and performed. It happens before design starts, and it is what stops a project discovering its real requirements halfway through construction.',
      'We interview the people who will use the building, document how they actually work, and translate that into space requirements, adjacencies and performance criteria. The output is a written programme the design can be measured against — and a budget and schedule that are grounded in something.',
      'Getting this stage right is the cheapest risk reduction available on any project. Every hour spent here saves several during construction.',
    ],
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
    detailHeading: 'Construction Administration',
    detailBody: [
      'Construction administration takes place after the design has been completed, all drawings have been completed and approved by the local building department, and construction begins. It is the work of making sure the building that goes up is the building that was designed.',
      'We review shop drawings and submittals, answer contractor queries, inspect the work as it proceeds, certify payment applications and keep a written record of every instruction and variation. Problems surface early, in writing, while they are still cheap to fix.',
      'At completion we run the defects inspection, assemble the operation and maintenance manuals, and hand over a building with its paperwork in order.',
    ],
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
    detailHeading: 'Geology and Mine Engineering',
    detailBody: [
      'Ground investigation, resource assessment and mine design — the geotechnical groundwork that tells you what can safely be built, and how. Every structure ultimately rests on ground, and the ground is the one variable that cannot be specified, only discovered.',
      'Our engineers plan and supervise site investigations, log and test samples, and produce the factual and interpretative reports that foundation design depends on. For mining clients we cover resource assessment, pit and stope design, slope stability and rehabilitation planning.',
      'Where conditions turn out to be worse than assumed, we would rather tell you at investigation stage than at excavation stage. That is the entire point of the discipline.',
    ],
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
