import { images, type ImageSlot } from './images'

export type Capability = {
  id: string
  index: string
  title: string
  summary: string
  scope: string[]
  body: string[]
  /** Underlays the capability's masthead, the same frame as its project. */
  image: ImageSlot
}

/**
 * Axis is a general contractor whose centre of gravity is oil and gas. The
 * list leads with the energy disciplines and carries the full civil,
 * structural and building scope behind them.
 */
export const capabilities: Capability[] = [
  {
    id: 'oil-and-gas-facilities',
    index: '01',
    title: 'Oil & Gas Facilities',
    summary:
      'Onshore process plants, gas facilities and tank farms. Built, tied in and commissioned.',
    scope: [
      'Process and utility pipework',
      'Static and rotating equipment installation',
      'Tank farms and terminals',
      'Shutdown tie-ins and reinstatement',
      'Pre-commissioning and commissioning support',
    ],
    body: [
      'Most of our people spend most of the year on oil and gas work. We build and extend onshore process plants, gas facilities and storage terminals. That covers the process and utility pipework, setting the static and rotating equipment, and staying on through commissioning until the plant is actually producing something.',
      'A plant is really a stack of systems that get handed over one at a time, so that is how we plan it. Scope is broken down by system instead of by trade, and each one gets its own test pack, punch register and acceptance date. You can take the utilities while we are still welding on the process side. And nobody finds out at the end that a line never got pressure-tested because it fell between two subcontractors.',
      'Brownfield tie-ins are a different job to greenfield and we crew them differently. Isolation, permits, execution, reinstatement, all planned to the hour against your shutdown window and not the week. Spools get pre-fabricated and trial-fitted before the plant comes down, so the outage gets spent welding instead of deciding things.',
      'Working inside a live hydrocarbon envelope sets the bar for everything else we do. Hot work control, gas testing, isolation registers, permits that do not get relaxed because someone is behind on programme. Our supervisors can stop the job and they are expected to.',
      'The same crews carry the paperwork the job demands. Welder qualifications current and mapped to procedure, material certificates kept, NDE filed as the work goes in. It is dull, and it is why our systems get accepted first time instead of after a punch round.',
    ],
    image: images.gasFacility,
  },
  {
    id: 'offshore-and-marine',
    index: '02',
    title: 'Offshore & Marine',
    summary:
      'Modules built and tested in the yard, then set, hooked up and maintained offshore.',
    scope: [
      'Topside modules and skids',
      'Structural repair and reinforcement',
      'Riser, caisson and conductor works',
      'Offshore maintenance campaigns',
    ],
    body: [
      'Offshore work gets planned onshore. We build topside modules and skids in the yard, test them complete and ship them ready to set. An hour offshore costs nothing like an hour in a workshop, and the weather makes decisions for you more often than most programmes admit.',
      'That shapes every campaign. Lift studies, sea-fastening and set-down order are settled before anything leaves the quay. Modules get trial-assembled and pre-commissioned on the ground, with as much of the wiring, instrumentation and pipework terminated as the lift envelope allows. By the time it goes out, offshore work is mostly setting it down and hooking it up.',
      'The other half of what we do is repair. Splash-zone corrosion, fatigue cracking at the nodes, deck plating, caissons, conductors, riser guides. We survey it, engineer the fix and carry it out with the asset producing where that is safe, working off the platform or off a vessel depending on access and sea state.',
      'Our offshore crews hold current tickets for what they do, survival and medical through to trade quals, and they mobilise as a team that already works together instead of strangers meeting at the heliport. The supervisor who planned the campaign flies out with it.',
      'Every campaign has a weather contingency and a back-loading plan. If a window shuts we already know which scope can sit part-finished and which has to be run to a natural break. That gets decided before mobilisation, not halfway through a shift.',
    ],
    image: images.offshorePlatform,
  },
  {
    id: 'civil-infrastructure',
    index: '03',
    title: 'Roadworks, Tunnels, Bridges & Drainage',
    summary:
      'Roads, tunnels, bridges, and the drainage that keeps them standing.',
    scope: [
      'Site preparation, grading and earthworks',
      'Pavement construction and road marking',
      'Tunnel excavation, lining and ventilation',
      'Bridge foundations, piers and decks',
      'Stormwater and subsurface drainage',
    ],
    body: [
      'We build roads and highways from the ground up. Site prep, grading, pavement, signage, road marking. Jobs run from a few hundred metres of estate road through to full highway schemes.',
      'Tunnelling covers the geotechnical investigation, the excavation, the lining and the ventilation. Every drive gets planned around what the ground is actually doing, not what the desk study hoped for, which is how settlement and surface disruption stay inside the limits everyone agreed to.',
      'Bridges run from footbridges up to multi-span highway crossings. Foundations, piers, decks, bearings. We model the load paths and the build sequence up front so staging, lifting and traffic management are sorted before anyone turns up. Beam, arch, suspension or cable-stayed, whatever suits the span and the ground it is landing on.',
      'Drainage gets sized for the catchment, not for the trench it sits in. Pipes, culverts, catch basins, attenuation, outfalls, all worked out around the runoff the road will really see. It is the part nobody looks at, and it decides whether the pavement survives its second wet winter.',
      'Nearly all of this happens next to live traffic, buried services and people who never asked for a site outside their front door. Traffic management, diversions, service searches and talking to residents are part of the job from day one. We will take night and weekend possessions where they buy back more than they cost.',
    ],
    image: images.roadwork,
  },
  {
    id: 'structural-steel-concrete',
    index: '04',
    title: 'Structural Steel & Concrete Structures',
    summary:
      'Steel we detail, fabricate and erect ourselves, plus reinforced and post-tensioned concrete.',
    scope: [
      'Detailing and shop drawings',
      'Workshop fabrication and finishing',
      'Site erection and bolting',
      'Reinforced and post-tensioned concrete',
      'Access platforms, walkways and handrail',
    ],
    body: [
      'We detail, fabricate and erect our own steel. Keeping it in one place gets rid of the seam where steel jobs usually lose time, which is between the detailer, the shop and the erection crew.',
      'Detailing decides how the rest of it goes. Connections get modelled and checked against the erection sequence before a plate is cut, so nobody on site is asked to bolt up something you cannot physically get a spanner to. Shop drawings come off the same model the fabricator works from.',
      'In the shop we cut, drill, fit and weld to procedure, with dimensional checks at fit-up and again before finishing. Coatings are specified for wherever the steel is going to live. A coastal terminal and a covered warehouse do not get the same system. And it goes on under cover, not in the rain on site.',
      'Erection is planned around the lifts. Crane positions, ground bearing pressure, temporary bracing, the order the frame becomes self-supporting in. Stability never depends on the next piece turning up on time.',
      'On the concrete side we do foundations, retaining walls, culverts, reservoirs and frames, reinforced or post-tensioned. Mix design, formwork and curing are controlled on site with testing at every pour. Post-tensioning is stressed and grouted by our own crew to a recorded sequence, with elongations checked against the calculation before the jack comes off.',
    ],
    image: images.steelStructure,
  },
  {
    id: 'mechanical-piping',
    index: '05',
    title: 'Mechanical & Piping',
    summary:
      'Rotating equipment, pressure systems and pipework, installed and tested.',
    scope: [
      'Pump, compressor and turbine installation',
      'Pressure vessel setting and dressing',
      'Spool fabrication and site welding',
      'Hydrotesting and system reinstatement',
    ],
    body: [
      'Mechanical and piping is the trade the rest of the business grew out of. We install rotating equipment, set and dress pressure vessels, fabricate spools, weld on site and test whole systems before handing them back.',
      'Rotating kit gets set to alignment tolerance and left there. Baseplates grouted properly, soft foot dialled out, cold alignment set with thermal growth allowed for, every reading written down. Pipework is fitted to the machine, not pulled onto it. If a flange has to be strained to reach a nozzle then the spool is wrong and we make another one.',
      'Spools get fabricated in the shop wherever the drawing allows. A weld made on a bench beats one made overhead in a pipe rack on quality, on speed, and on the back of whoever is making it. Site welding is positional, coded and inspected to the same procedures as shop work.',
      'Systems are hydrotested, drained, dried and reinstated by the crew that built them, so whoever signs the pack knows what is inside the line. If a system cannot be filled we agree the alternative with you and the inspector before any pressure goes near it.',
      'Every weld traces back to a procedure and a welder. Test packs get built up as the work goes in. Reconstructing them afterwards is how handovers turn into arguments.',
    ],
    image: images.rigMaintenance,
  },
  {
    id: 'design-and-build',
    index: '06',
    title: 'Architectural Design & Build',
    summary:
      'Buildings from first sketch to handover, drawn and built by the same team.',
    scope: [
      'Concept design and 3D modelling',
      'Planning applications and approvals',
      'Building regulation and structural drawings',
      'Single-point design and build delivery',
    ],
    body: [
      'We take buildings from a first sketch through to something that can actually be priced and built. Concept drawings to begin with, then three-dimensional models once there is enough settled to be precise about.',
      'Scaled plans and elevations for planning, building regulation drawings, structural drawings, finishes and fittings. They all come from the team that is going to build the job, so what gets drawn is buildable.',
      'Design is where the money gets committed, so we price as we draw. There is no point producing something lovely that cannot be built for the budget, and we would far rather find that out over a sketch than over a tender return.',
      'Approvals are our job too, not something we hand back to you. Planning drawings, drainage and structural calculations, fire strategy, building regs submissions. We prepare them, track them and keep the correspondence in one place so nobody is guessing which revision got approved.',
      'The same team runs the build, which cuts out the most expensive conversation in construction. That is the one where the designer and the contractor disagree about what a drawing meant. Queries go to whoever drew it and usually come back the same day.',
      'If you want a single point of accountability we will do design and build together. One project manager, one contract, one number to hold us to.',
    ],
    image: images.interiorFitout,
  },
  {
    id: 'construction-administration',
    index: '07',
    title: 'Construction Administration',
    summary: 'Keeping an eye on the build once the drawings are approved.',
    scope: [
      'Submittal and shop drawing review',
      'Periodic site inspection and reporting',
      'Request for information handling',
      'Payment certification and punch lists',
    ],
    body: [
      'Construction administration starts once the design is signed off and the build begins. We oversee the project and make sure what goes up matches the documents.',
      'In practice that means site visits, reviewing samples and submittals against the specification, answering requests for information in writing, documenting every change, and running the punch list at the end so handover is a formality.',
      'Submittal review is deliberately slow. A shop drawing waved through because the programme is tight turns into a defect three months later at ten times the cost. We check against the specification and the coordinated model, and we say no when the answer is no.',
      'Change is what quietly eats budgets, and it does it fastest when it is verbal. Every instruction gets written down, priced and dated before it is built, so the final account reconciles against a record you have been reading all along.',
      'We certify payment against work that is genuinely in place. That keeps you from paying ahead of progress, and it keeps the contractor from chasing money they have already earned.',
      'When we are administering somebody else’s contract we say so and we act impartially inside it. Our construction arm does not bid work we are administering.',
    ],
    image: images.siteReview,
  },
  {
    id: 'geology-mine-engineering',
    index: '08',
    title: 'Geology & Mine Engineering',
    summary:
      'Ground investigation, resource assessment, and the geotechnical case for what you can build.',
    scope: [
      'Geological assessment and site characterisation',
      'Mining feasibility studies',
      'Geotechnical engineering and foundation design',
      'Slope stability and risk assessment',
      'Environmental compliance and permitting support',
    ],
    body: [
      'Everything ends up sitting on ground, and the ground is the one thing you cannot specify. You can only go and find out what is there. Our geologists look at the rock formations, the soil, the groundwater and whatever else bears on stability.',
      'Investigation gets scoped to the question being asked. A pad foundation on ground you already know does not need what a tunnel portal needs, and boreholes sunk without a hypothesis are just expensive holes. We agree what we are trying to establish, then design the investigation to establish it.',
      'For mining clients we run feasibility studies covering mineral resource, extraction method and environmental impact, along with pit and slope design and rehabilitation planning. Slope stability gets monitored as a live thing. Groundwater, blast damage and weathering all move the answer over the life of a pit.',
      'The geotechnical work feeds straight into foundation design. Bearing capacity, settlement, pile type and depth, earth pressures on retaining structures, where ground improvement is worth doing and where you are better off building somewhere else. Because we carry it through to construction, the assumptions in the report are the ones the site crew ends up working to.',
      'Environmental compliance sits alongside all of it. Baseline surveys, contamination assessment, discharge and dewatering consents, and the monitoring that keeps them valid.',
      'If the ground turns out worse than anyone assumed, you want to hear about it at investigation stage and not once the excavator is already sat there.',
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

/** Featured work, all drawn from the full-resolution photography. */
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
  { value: '25', label: 'Years going' },
  { value: '640', label: 'Projects finished' },
  { value: '1200', label: 'People on the tools' },
  { value: '4', label: 'Regions we work in' },
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
    body: 'We walk the site, look at what is in the way, and tell you what the job really involves before anyone commits to a number.',
  },
  {
    index: '02',
    title: 'Engineering & planning',
    body: 'Work packs, method statements and a programme built around your shutdown window instead of our convenience.',
  },
  {
    index: '03',
    title: 'Fabrication & build',
    body: 'As much built and tested in the workshop as we can manage, so site time goes on installing instead of fixing.',
  },
  {
    index: '04',
    title: 'Commission & hand over',
    body: 'Tested, documented and handed back running, with the test packs built up as the work went in.',
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
    body: 'Roads and highways built from the ground up. Site prep, grading, pavement, signage and road marking, on jobs running from a few hundred metres of estate road through to full highway schemes.',
  },
  {
    id: 'tunnels',
    title: 'Tunnels',
    body: 'Excavation, structural design, reinforcement, ventilation and safety systems, for transport, utility and mining tunnels. Every drive gets planned around the ground we actually hit rather than the ground the desk study hoped for.',
  },
  {
    id: 'bridges',
    title: 'Bridges',
    body: 'Beam, arch, suspension and cable-stayed crossings. Structural analysis, foundation design, piers and deck installation, sequenced so staging and traffic management are sorted before anyone mobilises.',
  },
  {
    id: 'drainage',
    title: 'Drainage',
    body: 'Stormwater and subsurface systems that take the runoff away before it takes the road with it. Pipes, culverts, catch basins and retention, sized for the catchment they serve.',
  },
  {
    id: 'concrete',
    title: 'Concrete Structures',
    body: 'Foundations, retaining walls, culverts and reservoirs in reinforced and post-tensioned concrete. Mix design, formwork and curing controlled on site, with testing at every pour.',
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
