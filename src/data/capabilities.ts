import { images, type ImageSlot } from './images'

export type Capability = {
  id: string
  /** Zero-padded index shown beside the title. */
  index: string
  title: string
  summary: string
  /** Bullet scope list on the capability's own page. */
  scope: string[]
  body: string[]
}

/**
 * Single source of truth for capabilities: drives the home grid, the side
 * drawer's sub-menu, the index page and each detail page.
 */
export const capabilities: Capability[] = [
  {
    id: 'plant-construction',
    index: '01',
    title: 'Industrial Plant Construction',
    summary:
      'Greenfield and brownfield process facilities, built to commissioning and handed over running.',
    scope: [
      'Civil works and foundations',
      'Equipment setting and alignment',
      'Process and utility pipework',
      'Pre-commissioning and commissioning support',
    ],
    body: [
      'We take process facilities from a cleared site to a running plant. That means civils and foundations, setting and aligning heavy equipment, running process and utility pipework, and staying on site through pre-commissioning until the plant is producing.',
      'Brownfield work is a different discipline to greenfield, and we treat it as one. Tie-ins into live systems are planned around your shutdown windows, with isolation, permitting and reinstatement scheduled to the hour rather than the week.',
    ],
  },
  {
    id: 'energy-infrastructure',
    index: '02',
    title: 'Energy & Power Infrastructure',
    summary:
      'Generation, transmission and grid-connection works for conventional and renewable assets.',
    scope: [
      'Substation civils and steelwork',
      'Turbine and generator installation',
      'Cable routing and containment',
      'Grid connection and energisation support',
    ],
    body: [
      'Power projects live or die on the connection date. We build the civil and structural scope around that date — substation foundations and steelwork, plant installation, cable routing and containment — and sequence it so energisation is never waiting on us.',
      'The same crews work across conventional generation and renewables. The plant differs; the disciplines of setting heavy rotating equipment and terminating high-voltage systems safely do not.',
    ],
  },
  {
    id: 'offshore-marine',
    index: '03',
    title: 'Offshore & Marine',
    summary:
      'Fabrication, installation and maintenance for offshore platforms and marine structures.',
    scope: [
      'Topside modules and skids',
      'Structural repair and reinforcement',
      'Riser and caisson works',
      'Offshore maintenance campaigns',
    ],
    body: [
      'Offshore scope is planned onshore. We fabricate topside modules and skids in the yard, test them complete, and ship them ready to set — because the cost of an hour offshore is nothing like the cost of an hour in a workshop.',
      'Our offshore crews hold current certification for the work they do and mobilise as a formed team, not as individuals assembled at the heliport.',
    ],
  },
  {
    id: 'mechanical-piping',
    index: '04',
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
      'Mechanical and piping is the core trade the rest of the business is built around. We install rotating equipment to alignment tolerances, set and dress pressure vessels, fabricate spools, weld on site, and test complete systems before handing them back.',
      'Every weld is traceable to a procedure and a welder. Test packs are assembled as the work proceeds rather than reconstructed afterwards, which is why our systems get accepted first time.',
    ],
  },
  {
    id: 'structural-steel',
    index: '05',
    title: 'Structural Steel & Fabrication',
    summary:
      'In-house fabrication and site erection of primary and secondary steelwork.',
    scope: [
      'Detailing and shop drawings',
      'Workshop fabrication and finishing',
      'Site erection and bolting',
      'Access platforms, walkways and handrail',
    ],
    body: [
      'We detail, fabricate and erect our own steel. Keeping that in one place removes the interface where most steel programmes lose time — between the detailer, the shop and the erection crew.',
      'The workshop handles primary frames through to access platforms, walkways and handrail, finished and marked ready for erection in sequence.',
    ],
  },
  {
    id: 'maintenance-turnaround',
    index: '06',
    title: 'Maintenance & Turnaround',
    summary:
      'Planned shutdowns and continuous maintenance, scoped and resourced to the window.',
    scope: [
      'Turnaround planning and work packs',
      'Multi-discipline shutdown execution',
      'Inspection and repair scope',
      'Routine and call-out maintenance',
    ],
    body: [
      'A turnaround is a scheduling problem wearing overalls. We plan the scope into work packs, resource each one to the critical path, and execute with multi-discipline crews so a task never waits for a trade to arrive.',
      'Between shutdowns we hold routine and call-out maintenance contracts, which means the team that arrives for the turnaround already knows the asset.',
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

/** Featured work on the home page and the Projects index. */
export const projects: Project[] = [
  {
    id: 'process-facility',
    title: 'Process Facility Expansion',
    sector: 'Industrial Plant',
    location: 'Placeholder Region',
    year: '2024',
    image: images.plant,
  },
  {
    id: 'offshore-platform',
    title: 'Offshore Platform Works',
    sector: 'Offshore & Marine',
    location: 'Placeholder Field',
    year: '2023',
    image: images.offshore,
  },
  {
    id: 'vessel-installation',
    title: 'Pressure Vessel Installation',
    sector: 'Mechanical & Piping',
    location: 'Placeholder Site',
    year: '2023',
    image: images.mechanical,
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

/** Short claims that scroll in the marquee band. */
export const marqueeItems: string[] = [
  'Plant Construction',
  'Mechanical & Piping',
  'Structural Steel',
  'Offshore & Marine',
  'Turnaround',
  'Power Infrastructure',
  'Fabrication',
  'Commissioning',
]
