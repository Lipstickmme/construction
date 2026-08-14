import { images, type ImageSlot } from './images'

export type Capability = {
  id: string
  index: string
  title: string
  summary: string
  scope: string[]
  body: string[]
  /** Underlays the capability's masthead — the same frame as its project. */
  image: ImageSlot
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
      'Onshore process facilities, gas plants and terminals: built, tied in and commissioned.',
    scope: [
      'Process and utility pipework',
      'Static and rotating equipment installation',
      'Tank farms and terminals',
      'Shutdown tie-ins and reinstatement',
      'Pre-commissioning and commissioning support',
    ],
    body: [
      'Oil and gas is where most of our people spend most of their time. We build and extend onshore process facilities, gas plants and storage terminals: running process and utility pipework, setting static and rotating equipment, and staying on site through commissioning until the plant is producing.',
      'A facility is really a set of systems that have to be handed over one at a time, so that is how we plan the work. Scope is broken down by system rather than by trade, each with its own test pack, punch register and acceptance date. It means a client can take receipt of the utilities while the process side is still being welded, and it means nobody discovers at the end that a line was never pressure-tested because it fell between two subcontractors.',
      'Brownfield tie-ins are a different discipline to greenfield build, and we resource them as one. Isolation, permitting, execution and reinstatement are planned to the hour against your shutdown window rather than the week. Spools are pre-fabricated and trial-fitted before the plant comes down, so the critical path inside the outage is measured in welds rather than in decisions.',
      'Working inside a live hydrocarbon envelope sets the standard for everything else we do: hot work control, gas testing, isolation registers, and a permit discipline that does not soften because a programme is tight. Our supervisors have the authority to stop work and are expected to use it.',
      'The same crews carry the certification, procedures and traceability that operating a hydrocarbon facility demands. Welder qualifications are current and mapped to procedure, material certificates are retained, and NDE results are filed as the work goes in. That is why our systems get accepted first time rather than after a punch round.',
    ],
    image: images.gasFacility,
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
      'Offshore scope is planned onshore. We fabricate topside modules and skids in the yard, test them complete and ship them ready to set, because an hour offshore costs nothing like an hour in a workshop, and because weather takes the decision out of your hands more often than any programme admits.',
      'That principle runs through every campaign we plan. Lift studies, sea-fastening and set-down sequencing are settled before anything leaves the quay. Modules are trial-assembled and pre-commissioned on the ground, with as much of the wiring, instrumentation and pipework terminated as the lift envelope allows, so offshore work reduces to setting, connecting and testing.',
      'Structural repair and reinforcement is the other half of the work: splash-zone corrosion, fatigue cracking at nodes, deck plating, caissons, conductors and riser guides. We survey, engineer the repair and carry it out with the asset producing wherever it is safe to do so, staging from the platform or from a vessel depending on access and sea state.',
      'Our offshore crews hold current certification for the work they do (survival, medical, working at height, confined space and trade tickets) and mobilise as a formed team rather than as individuals assembled at the heliport. The supervisor who plans the campaign flies out with it.',
      'Every campaign carries a weather contingency and a back-loading plan. If a window closes, we know which scope is safe to leave part-complete and which has to be run to a natural break, and that decision is made before mobilisation rather than in the middle of a shift.',
    ],
    image: images.offshorePlatform,
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
      'We design and construct roads and highways end to end, from site preparation and grading through pavement construction, signage and road marking, across projects from small local roads to large-scale highway schemes.',
      'Tunnelling work covers geotechnical investigation, excavation, lining and ventilation, planned around the ground conditions actually on site so surface disruption and settlement stay within agreed limits.',
      'Bridges run from footbridges to multi-span highway crossings: foundations, piers, decks and bearings, with load paths and construction sequencing modelled up front so staging, lifting and traffic management are settled before work begins. Beam, arch, suspension and cable-stayed forms are all within scope, and the form is chosen for the span and the ground rather than for the crew that happens to be available.',
      'Drainage is designed around the catchment it serves rather than the trench it sits in: pipes, culverts, catch basins, attenuation and outfalls sized for the runoff the road will actually see. It is the least visible part of a highway scheme and the part that decides whether the pavement survives its second wet season.',
      'Almost all of this is built next to traffic, services and people who did not ask for a construction site outside their door. Temporary traffic management, diversion routes, service searches and public liaison are planned as part of the works rather than bolted on, and night and weekend possessions are used where they buy back more than they cost.',
    ],
    image: images.roadwork,
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
      'We detail, fabricate and erect our own steel. Keeping that under one roof removes the interface where most steel programmes lose time: the one between the detailer, the shop and the erection crew.',
      'Detailing is where a steel job is won or lost. Connections are modelled and checked against the erection sequence before a single plate is cut, so the crew on site is never asked to make a bolted connection that cannot physically be reached with a spanner. Shop drawings are issued from the same model the fabricator works to.',
      'In the workshop we cut, drill, fit and weld to procedure, with dimensional checks at fit-up and again before finishing. Surface preparation and protective coating are specified for the environment the steel will live in (a coastal terminal and a covered warehouse do not get the same system) and applied under controlled conditions rather than in the rain on site.',
      'Erection is planned around lifts. Crane positions, ground bearing pressure, temporary bracing and the order in which the frame becomes self-supporting are all worked out in advance, so stability never depends on the next piece arriving on time.',
      'On the concrete side we deliver foundations, retaining walls, culverts, reservoirs and frames in both reinforced and post-tensioned form. Mix design, formwork and curing are controlled on site with testing at every pour, so the specified strength and finish are what actually gets built. Post-tensioning is stressed and grouted by our own crew to a recorded sequence, with elongations checked against calculation before the jack is released.',
    ],
    image: images.steelStructure,
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
      'Rotating equipment is set to alignment tolerance and left there. Baseplates are grouted properly, soft foot is dialled out, cold alignment is set with thermal growth allowed for, and every reading is recorded. Pipework is fitted to the machine rather than pulled onto it. If a flange has to be strained to meet a nozzle, the spool is wrong and gets remade.',
      'Spool fabrication happens in the shop wherever the drawing allows, because a weld made on a bench beats a weld made overhead in a pipe rack on every measure that matters: quality, speed and the safety of the person making it. Site welding is positional, coded and inspected to the same procedures as shop work.',
      'Systems are hydrotested, drained, dried and reinstated by the crew that built them, so the person signing the pack is the person who knows what is inside the line. Where a system cannot be filled, we agree the alternative (pneumatic, service or vacuum testing) with the client and the inspector before the pressure goes anywhere near it.',
      'Every weld is traceable to a procedure and a welder. Test packs are assembled as the work proceeds rather than reconstructed afterwards, which is the difference between handing over a system and negotiating over one.',
    ],
    image: images.rigMaintenance,
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
      'Scaled plans and elevations for planning applications, building regulation drawings, structural drawings for the construction team and detailed finishes and fittings drawings all come from the same team that will build the job, so what gets drawn is what can be built.',
      'Design is where cost is decided, so we price as we draw. A concept that cannot be built for the budget is not a concept, it is a delay, and we would rather have that conversation over a sketch than over a tender return.',
      'Approvals are part of the job, not a hand-off. Scaled plans and elevations for planning, drainage and structural calculations, fire strategy and building regulation submissions are prepared and tracked by us, with the authority correspondence kept in one place so nobody is guessing which revision was approved.',
      'On site the same team runs the build, which removes the most expensive conversation in construction, the one where the designer and the contractor disagree about what a drawing meant. Queries are resolved by the person who drew it, usually the same day.',
      'Where clients want a single point of accountability we deliver design and build together, with one project manager across the whole programme, one contract and one number to hold us to.',
    ],
    image: images.interiorFitout,
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
      'Submittal review is deliberately unhurried. A shop drawing that gets waved through because the programme is tight becomes a defect three months later at ten times the cost, so we review against the specification and the coordinated model, and we say no when the answer is no.',
      'Change is the thing that quietly destroys budgets, and it destroys them fastest when it is verbal. Every instruction is written, priced and dated before it is built, so the account at the end of the job reconciles to a record both sides have been reading all along.',
      'We also certify payment against work genuinely in place, which protects the client from paying ahead of progress and protects the contractor from arguing for money they have already earned. Neither party benefits from a valuation that is a matter of opinion.',
      'Where we are administering someone else’s construction contract, we say so plainly and act impartially within it. Our own construction arm never bids work we are administering.',
    ],
    image: images.siteReview,
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
      'Every structure ultimately rests on ground, and the ground is the one variable that cannot be specified, only discovered. Our geologists assess the conditions at your site: rock formations, soil composition, groundwater and the hazards that bear on stability.',
      'Investigation is scoped to the question being asked. A pad foundation on known ground does not need the programme a tunnel portal needs, and boreholes sunk without a hypothesis are just expensive holes. We agree what we are trying to find out, then design the ground investigation to find it out.',
      'For mining clients we run feasibility studies covering mineral resource, extraction method and environmental impact, alongside pit and slope design and rehabilitation planning. Slope stability is monitored as a live condition rather than certified once: groundwater, blast damage and weathering all move the answer over the life of a pit.',
      'The geotechnical output feeds straight into foundation design: bearing capacity, settlement, piling type and depth, earth pressures on retaining structures, and the ground improvement worth doing versus the ground worth avoiding. Because the same firm carries the work through to construction, the assumptions in the report are the assumptions the site crew is actually working to.',
      'Environmental compliance and permitting support sits alongside all of it: baseline surveys, contamination assessment, discharge and dewatering consents, and the monitoring regimes that keep them valid.',
      'Where conditions turn out worse than assumed, we would rather tell you at investigation stage than at excavation stage. That is the entire point of the discipline.',
    ],
    image: images.civilWorks,
  },
]

export type Project = {
  id: string
  title: string
  sector: string
  year: string
  image: ImageSlot
}

/** Featured work — all drawn from the full-resolution photography. */
export const projects: Project[] = [
  {
    id: 'offshore-platform',
    title: 'Offshore Platform Works',
    sector: 'Oil & Gas',
    year: '2024',
    image: images.offshorePlatform,
  },
  {
    id: 'gas-facility',
    title: 'Rig Maintenance Campaign',
    sector: 'Oil & Gas',
    year: '2024',
    image: images.rigMaintenance,
  },
  {
    id: 'post-tensioned-deck',
    title: 'Structural Steel Erection',
    sector: 'Structural Steel',
    year: '2023',
    image: images.steelStructure,
  },
  {
    id: 'earthworks',
    title: 'Highway & Access Roadworks',
    sector: 'Roadworks',
    year: '2023',
    image: images.roadwork,
  },
  {
    id: 'structural-frame',
    title: 'Civil Infrastructure Works',
    sector: 'Civil Infrastructure',
    year: '2022',
    image: images.civilWorks,
  },
  {
    id: 'high-rise',
    title: 'Commercial Interior Fit-out',
    sector: 'Design & Build',
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
    body: 'Design and construction of roads and highways, covering site preparation, grading, pavement construction, signage installation and road marking, across projects from small local roads through to large-scale highways.',
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
    body: 'Stormwater and subsurface systems that manage runoff and prevent flooding and erosion: pipes, culverts, catch basins and retention, sized to the catchment they serve.',
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
