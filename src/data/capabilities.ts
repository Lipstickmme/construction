import { images, type ImageSlot } from './images'

export type Capability = {
  id: string
  index: string
  title: string
  summary: string
  scope: string[]
  body: string[]
}

/**
 * Axis is a general construction contractor whose centre of gravity is oil
 * and gas. The list leads with the energy disciplines, then carries the full
 * civil, structural and building scope behind them.
 */
export const capabilities: Capability[] = [
  {
    id: 'oil-and-gas-facilities',
    index: '01',
    title: 'Oil & Gas Facilities',
    summary:
      'Onshore process facilities, gas plants and terminals — built, tied in and commissioned.',
    scope: [
      'Process and utility pipework',
      'Static and rotating equipment installation',
      'Tank farms and terminals',
      'Shutdown tie-ins and reinstatement',
      'Pre-commissioning and commissioning support',
    ],
    body: [
      'Oil and gas is where most of our people spend most of their time. We build and extend onshore process facilities, gas plants and storage terminals — running process and utility pipework, setting static and rotating equipment, and staying on site through commissioning until the plant is producing.',
      'Brownfield tie-ins are a different discipline to greenfield build, and we resource them as one. Isolation, permitting, execution and reinstatement are planned to the hour against your shutdown window rather than the week.',
      'The same crews carry the certification, procedures and traceability that operating a hydrocarbon facility demands, which is why our systems get accepted first time rather than after a punch round.',
    ],
  },
  {
    id: 'offshore-and-marine',
    index: '02',
    title: 'Offshore & Marine',
    summary:
      'Fabrication, installation and maintenance for platforms and marine structures.',
    scope: [
      'Topside modules and skids',
      'Structural repair and reinforcement',
      'Riser, caisson and conductor works',
      'Offshore maintenance campaigns',
    ],
    body: [
      'Offshore scope is planned onshore. We fabricate topside modules and skids in the yard, test them complete and ship them ready to set — because an hour offshore costs nothing like an hour in a workshop.',
      'Our offshore crews hold current certification for the work they do and mobilise as a formed team rather than as individuals assembled at the heliport.',
    ],
  },
  {
    id: 'civil-infrastructure',
    index: '03',
    title: 'Roadworks, Tunnels, Bridges & Drainage',
    summary:
      'Transport and civil infrastructure, from site preparation through to surfacing.',
    scope: [
      'Site preparation, grading and earthworks',
      'Pavement construction and road marking',
      'Tunnel excavation, lining and ventilation',
      'Bridge foundations, piers and decks',
      'Stormwater and subsurface drainage',
    ],
    body: [
      'We design and construct roads and highways end to end — site preparation, grading, pavement construction, signage and road marking — across projects from small local roads to large-scale highway schemes.',
      'Tunnelling work covers geotechnical investigation, excavation, lining and ventilation, planned around the ground conditions actually on site so surface disruption and settlement stay within agreed limits.',
      'Bridges run from footbridges to multi-span highway crossings: foundations, piers, decks and bearings, with load paths and construction sequencing modelled up front so staging, lifting and traffic management are settled before work begins. Drainage is designed around the catchment it serves, keeping pavements sound through the wet season.',
    ],
  },
  {
    id: 'structural-steel-concrete',
    index: '04',
    title: 'Structural Steel & Concrete Structures',
    summary:
      'In-house fabrication and erection of steelwork, plus reinforced and post-tensioned concrete.',
    scope: [
      'Detailing and shop drawings',
      'Workshop fabrication and finishing',
      'Site erection and bolting',
      'Reinforced and post-tensioned concrete',
      'Access platforms, walkways and handrail',
    ],
    body: [
      'We detail, fabricate and erect our own steel. Keeping that under one roof removes the interface where most steel programmes lose time — between the detailer, the shop and the erection crew.',
      'On the concrete side we deliver foundations, retaining walls, culverts, reservoirs and frames in both reinforced and post-tensioned form. Mix design, formwork and curing are controlled on site with testing at every pour, so the specified strength and finish are what actually gets built.',
    ],
  },
  {
    id: 'mechanical-piping',
    index: '05',
    title: 'Mechanical & Piping',
    summary:
      'Rotating equipment, pressure systems and pipework, installed and tested to spec.',
    scope: [
      'Pump, compressor and turbine installation',
      'Pressure vessel setting and dressing',
      'Spool fabrication and site welding',
      'Hydrotesting and system reinstatement',
    ],
    body: [
      'Mechanical and piping is the trade the rest of the business grew around. We install rotating equipment to alignment tolerance, set and dress pressure vessels, fabricate spools, weld on site and test complete systems before handing them back.',
      'Every weld is traceable to a procedure and a welder. Test packs are assembled as the work proceeds rather than reconstructed afterwards.',
    ],
  },
  {
    id: 'design-and-build',
    index: '06',
    title: 'Architectural Design & Build',
    summary:
      'Concept through completion for buildings, from first sketch to handover.',
    scope: [
      'Concept design and 3D modelling',
      'Planning applications and approvals',
      'Building regulation and structural drawings',
      'Single-point design and build delivery',
    ],
    body: [
      'From initial concept drawings that sketch out an impression of the finished building, through to three-dimensional modelling that adds precision and clarity, we take building projects from idea to something that can actually be priced and built.',
      'Scaled plans and elevations for planning applications, building regulation drawings, structural drawings for the construction team and detailed finishes and fittings drawings all come from the same team that will build the job — so what gets drawn is what can be built.',
      'Where clients want a single point of accountability we deliver design and build together, with one project manager across the whole programme.',
    ],
  },
  {
    id: 'construction-administration',
    index: '07',
    title: 'Construction Administration',
    summary:
      'Oversight once drawings are approved and construction begins.',
    scope: [
      'Submittal and shop drawing review',
      'Periodic site inspection and reporting',
      'Request for information handling',
      'Payment certification and punch lists',
    ],
    body: [
      'Construction administration begins after the design is complete and approved, and construction starts. We act as overseer of the project, making sure what gets built matches the design documents.',
      'That means periodic site visits, reviewing samples and submittals against specification, handling requests for information in writing, documenting any change, and running the punch list at completion so final handover is a formality rather than a negotiation.',
    ],
  },
  {
    id: 'geology-mine-engineering',
    index: '08',
    title: 'Geology & Mine Engineering',
    summary:
      'Ground investigation, resource assessment and the geotechnical case for what can be built.',
    scope: [
      'Geological assessment and site characterisation',
      'Mining feasibility studies',
      'Geotechnical engineering and foundation design',
      'Slope stability and risk assessment',
      'Environmental compliance and permitting support',
    ],
    body: [
      'Every structure ultimately rests on ground, and the ground is the one variable that cannot be specified — only discovered. Our geologists assess the conditions at your site: rock formations, soil composition, groundwater and the hazards that bear on stability.',
      'For mining clients we run feasibility studies covering mineral resource, extraction method and environmental impact, alongside pit and slope design and rehabilitation planning.',
      'Where conditions turn out worse than assumed, we would rather tell you at investigation stage than at excavation stage. That is the entire point of the discipline.',
    ],
  },
]

export type Project = {
  id: string
  title: string
  sector: string
  location: string
  year: string
  image: ImageSlot
}

/** Featured work — all drawn from the full-resolution photography. */
export const projects: Project[] = [
  {
    id: 'offshore-platform',
    title: 'Offshore Platform Works',
    sector: 'Oil & Gas',
    location: 'Placeholder Field',
    year: '2024',
    image: images.offshorePlatform,
  },
  {
    id: 'gas-facility',
    title: 'Rig Maintenance Campaign',
    sector: 'Oil & Gas',
    location: 'Placeholder Region',
    year: '2024',
    image: images.rigMaintenance,
  },
  {
    id: 'post-tensioned-deck',
    title: 'Structural Steel Erection',
    sector: 'Structural Steel',
    location: 'Placeholder Site',
    year: '2023',
    image: images.steelStructure,
  },
  {
    id: 'earthworks',
    title: 'Highway & Access Roadworks',
    sector: 'Roadworks',
    location: 'Placeholder Region',
    year: '2023',
    image: images.roadwork,
  },
  {
    id: 'structural-frame',
    title: 'Civil Infrastructure Works',
    sector: 'Civil Infrastructure',
    location: 'Placeholder Site',
    year: '2022',
    image: images.civilWorks,
  },
  {
    id: 'high-rise',
    title: 'Commercial Interior Fit-out',
    sector: 'Design & Build',
    location: 'Placeholder City',
    year: '2022',
    image: images.interiorFitout,
  },
]

export type Metric = {
  value: string
  label: string
}

export const metrics: Metric[] = [
  { value: '25', label: 'Years operating' },
  { value: '640', label: 'Projects delivered' },
  { value: '1200', label: 'People on the tools' },
  { value: '4', label: 'Regions covered' },
]

export type ProcessStep = {
  index: string
  title: string
  body: string
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Scope & feasibility',
    body: 'We walk the site, read the constraints and tell you what the job actually involves before anyone commits to a number.',
  },
  {
    index: '02',
    title: 'Engineering & planning',
    body: 'Work packs, method statements and a programme built around your shutdown window rather than our convenience.',
  },
  {
    index: '03',
    title: 'Fabrication & build',
    body: 'As much as possible built and tested in the workshop, so site time is spent installing rather than fixing.',
  },
  {
    index: '04',
    title: 'Commission & hand over',
    body: 'Tested, documented and handed back running, with the test packs assembled as the work went in.',
  },
]

/** Checklist beside the approach image. */
export const approachPoints: string[] = [
  'Pre-construction services',
  'Single-point design and build',
  'Infrastructure and civil works',
  'Energy and process facilities',
  'Commercial and industrial engineering',
]

export type Discipline = {
  id: string
  title: string
  body: string
}

/** Accordion detailing the civil scope in plain terms. */
export const disciplines: Discipline[] = [
  {
    id: 'roadworks',
    title: 'Roadworks',
    body: 'Design and construction of roads and highways — site preparation, grading, pavement construction, signage installation and road marking, across projects from small local roads through to large-scale highways.',
  },
  {
    id: 'tunnels',
    title: 'Tunnels',
    body: 'Excavation, structural design, reinforcement, ventilation and safety systems for transport, utility and mining tunnels. Each drive is planned around the ground conditions actually encountered rather than the ones assumed.',
  },
  {
    id: 'bridges',
    title: 'Bridges',
    body: 'Beam, arch, suspension and cable-stayed crossings. Structural analysis, foundation design, support piers and deck installation, sequenced so staging and traffic management are settled before anyone mobilises.',
  },
  {
    id: 'drainage',
    title: 'Drainage',
    body: 'Stormwater and subsurface systems that manage runoff and prevent flooding and erosion — pipes, culverts, catch basins and retention, sized to the catchment they serve.',
  },
  {
    id: 'concrete',
    title: 'Concrete Structures',
    body: 'Foundations, retaining walls, culverts and reservoirs in reinforced and post-tensioned concrete, with mix design, formwork and curing controlled on site and testing at every pour.',
  },
]

/** Short claims that scroll in the marquee band. */
export const marqueeItems: string[] = [
  'Oil & Gas',
  'Offshore & Marine',
  'Roadworks',
  'Bridges & Tunnels',
  'Structural Steel',
  'Mechanical & Piping',
  'Design & Build',
  'Geology',
]
