/**
 * Body copy for each service page, supplied by the client.
 *
 * Kept separate from `services.ts` so that file stays a short manifest of
 * metadata. Keys must match a service `id`.
 */
export type ServiceBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  /** Bulleted list where each item leads with a bold term. */
  | { kind: 'terms'; items: { term: string; text: string }[] }
  /** Plain bulleted list. */
  | { kind: 'list'; items: string[] }

export type ServiceContent = {
  /** Heading above the body copy. */
  heading: string
  blocks: ServiceBlock[]
}

export const serviceContent: Record<string, ServiceContent> = {
  roadworks: {
    heading: 'Roadworks, Tunnels, Bridges, Drainage and Concrete Structures',
    blocks: [
      {
        kind: 'p',
        text: 'AtlasBridge Construction offers a range of services related to roadworks, tunnels, bridges, drainage, and concrete structures. These services are integral to the development and maintenance of transportation infrastructure and play a significant role in ensuring safe and efficient travel for both vehicles and pedestrians.',
      },
      { kind: 'h', text: 'Roadworks' },
      {
        kind: 'p',
        text: 'AtlasBridge Construction specializes in roadworks, which involve the design and construction of roads and highways. This includes activities such as site preparation, grading, pavement construction, signage installation, and road marking. They possess the expertise to handle various types of road projects, ranging from small local roads to large-scale highways.',
      },
      { kind: 'h', text: 'Tunnels' },
      {
        kind: 'p',
        text: 'Tunnel construction requires specialized knowledge and experience, and AtlasBridge Construction is equipped to handle such projects. They can design and build tunnels for transportation infrastructure, underground utilities, mining operations, or other purposes. This involves excavation, structural design, reinforcement, ventilation systems, and safety measures to ensure the integrity and functionality of the tunnel structure.',
      },
      { kind: 'h', text: 'Bridges' },
      {
        kind: 'p',
        text: 'Bridges are critical elements of transportation networks, and AtlasBridge Construction offers bridge design and construction services. They have the expertise to work with different types of bridges, including beam bridges, arch bridges, suspension bridges, and cable-stayed bridges. This involves structural analysis, foundation design, construction of support piers, and the installation of bridge decks to ensure durability and safety.',
      },
      { kind: 'h', text: 'Drainage' },
      {
        kind: 'p',
        text: 'Effective drainage systems are essential to prevent water accumulation and ensure the stability of transportation infrastructure. AtlasBridge Construction can design and construct drainage systems that efficiently manage stormwater runoff, preventing flooding and erosion. This includes the installation of drainage pipes, culverts, catch basins, and other components necessary for proper water flow management.',
      },
      { kind: 'h', text: 'Concrete Structures' },
      {
        kind: 'p',
        text: 'Concrete is a versatile and widely used material in construction, and AtlasBridge Construction specializes in the design and construction of various concrete structures. This includes foundations, retaining walls, culverts, reservoirs, and other structures that require durable and robust construction. They have the expertise to work with different concrete construction techniques, ensuring the longevity and strength of the structures.',
      },
      {
        kind: 'p',
        text: 'In summary, AtlasBridge Construction offers a comprehensive range of services related to roadworks, tunnels, bridges, drainage, and concrete structures. Their expertise in these areas allows them to contribute to the development of transportation infrastructure and other essential construction projects, ensuring safety, durability, and efficiency in the built environment.',
      },
    ],
  },

  'architectural-design': {
    heading: 'On-demand Architectural Design',
    blocks: [
      {
        kind: 'p',
        text: 'From initial concept drawings that sketch out an artist’s impression of what your home will look like post-build to three-dimensional modelling which adds precision and clarity to the design alongside a 3D virtual walkthrough. You’ll be able to view your project designs from any and all angles.',
      },
      {
        kind: 'p',
        text: 'Then scaled floor plans and elevations for use in planning applications, building regulation plans to highlight health and safety and ecological measures of the build, structural drawings for the construction team and detailed finishes and fittings drawings will give you a vivid insight into the way your home will look inside and out.',
      },
      {
        kind: 'p',
        text: 'The services that an architect typically provides include concept design development, preparation of construction documents, and construction administration. Architects also provide a wide variety of additional services including feasibility studies, architectural programming and project management.',
      },
      {
        kind: 'p',
        text: 'Depending on the level of service requested of an architect the following are typically offered by either the architect or their consultants:',
      },
      {
        kind: 'terms',
        items: [
          {
            term: 'Project Inception',
            text: 'This the where the planning of a project starts. Working together with the architect, the client shares their project needs, ideas and goals.',
          },
          {
            term: 'Schematic Design',
            text: 'During this stage the architect begins by preparing preliminary design sketches and concepts based on the client’s requirements and budget which help explore and illustrate possible options. The architect reviews the different options with the client going over the various pros and cons and responding to client input.',
          },
          {
            term: 'Design Development',
            text: 'Once a schematic design is agreed upon and there is a clearer definition of the scope and quality of the finished project the design development phase begins. Additional cost projections help determine whether or not the design conforms to the preliminary budget, or what, if any, adjustments need to be made.',
          },
          {
            term: 'Construction Documents',
            text: 'A continuation of the design development phase working drawings and specifications are developed after design concepts have been decided. These construction documents are what is required by the local municipalities in order to obtain building permits. They are also used to solicit bids from the various contractors that will be required to build the project.',
          },
          {
            term: 'Bidding and Negotiation',
            text: 'An architect can advise on the choice of contractor by evaluating competitive bids. The architect assists in the bid evaluation and assists in the preparation of the contract between the client and the contractor.',
          },
          {
            term: 'Construction and Contract Administration',
            text: 'The architect consults with the client and advises during construction. On-site visits help determine if construction is proceeding in general accordance with the construction document and design intent. It is also the architect’s role to advise if the materials and workmanship meet acceptable standards.',
          },
        ],
      },
    ],
  },

  'design-and-build': {
    heading: 'Design and Build Service',
    blocks: [
      {
        kind: 'p',
        text: 'Design and Build service is an innovative concept for home-owners who want to add extra space to their existing home, either by doing house extensions or loft conversions. It has many benefits, including more accessible communication with architects and building specialists, as well as saving you time.',
      },
      {
        kind: 'p',
        text: 'Our award-winning architects and qualified structural engineers have years of experience designing all types of single and double-storey home extensions for new and period properties. Our Design services include planning, architectural and structural drawings and obtaining planning permission.',
      },
      {
        kind: 'p',
        text: 'If you decide to go ahead with our company to complete the build, our builders extensions specialist will take care of the projects from start to finish. Our dedicated project manager will keep you updated throughout the whole process and will answer any questions you might have. Our Design and Build contractors work hard to turn your vision into reality with minimal disruption to your daily life.',
      },
    ],
  },

  'interior-design': {
    heading: 'Interior Design Service',
    blocks: [
      {
        kind: 'p',
        text: 'Interior design helps to enhance the interior of a building by achieving a more aesthetically pleasing environment for the people using the space. It is important to properly plan, research and coordinate the different finishes of a project. There is an emphasis on planning, functional design and the effective use of space. When working through the interior design it is important to consider the arrangement and basic layout of the various spaces within a building as well as properly understanding some of the more technical issues such as window and door locations, acoustics, daylighting and structure. While it is possible to introduce and create new spaces by building partition walls, load-bearing walls cannot be altered without consulting with the architect or structural engineer.',
      },
      {
        kind: 'p',
        text: 'Good interior design requires the participation of highly skilled professionals that help create interior environments that are not only functional but are also safe and adhere to the local building codes and regulations. It is important to consider aspects beyond the selection of colors and furnishings such as basic knowledge of construction documents, occupancy requirements and sustainable design principles. One must also be aware of and familiar with the management and necessary coordination of other professionals including mechanical, electrical, plumbing and structural engineers. It is necessary to approach all interior design this way to ensure that people can live, work and enjoy the space they occupy by making it aesthetically pleasing.',
      },
      {
        kind: 'p',
        text: 'Formal interior design is a creative profession that is constantly evolving. It relies on the research of many different products and materials. Aside from product and material selections, color can be used as a powerful tool when decoration a space. Interior design can be thought of the art of composing and coordinating colors to create a style inside the architecture of a space.',
      },
      {
        kind: 'p',
        text: 'Interior design requires a good working knowledge of colors and a thorough understanding of their psychological effects. Color can be used not only to set mood but also to define separate spaces and for wayfinding. This means different colors can be used in different locations in order to separate and define them not only physically but also psychologically.',
      },
      {
        kind: 'p',
        text: 'Combining colors and furnishings results in developing a certain feeling for the person experiencing the space. This can be either a positive or negative experience. Colors and materials can make a room feel calm, cheerful, comfortable, stressful, or dramatic. In the same way the correct selection and combination of colors and materials can make a relatively small room seem larger or a large room seem smaller. It is the responsibility of the professional to choose appropriate colors and materials for a space so the people that use that space are comfortable and enjoy being in it.',
      },
      {
        kind: 'p',
        text: 'For residential design this process is very specific for individual situations. It solely depends on the needs and wants of the client. It is important to start the project with a good understanding of the client’s aesthetic and stylistic preferences. This information needs to be discussed and taken into consideration from the initial planning stage of a project regardless of the size and scope of the job. Developing a good interior design is a very involved process that cannot be rushed or haphazardly put together. It must be given the time it deserves and fine-tuned throughout the design phase as it helps realize the clients vision for the space that has been created.',
      },
    ],
  },

  'architectural-programming': {
    heading: 'Architectural Programming Service',
    blocks: [
      {
        kind: 'p',
        text: 'Architectural programming can be defined as the research and decision-making process that helps to identify the scope of work to be designed and performed. Some of the advantages architectural programming offers are:',
      },
      {
        kind: 'list',
        items: [
          'Involvement of interested parties in the definition of the scope of work prior to design',
          'Gathering and analyzing data early in the process so the design is based on sound decisions',
          'Efficient use of time by avoiding redesign as requirements emerge during architectural design development',
        ],
      },
      {
        kind: 'p',
        text: 'Applying an integrated design approach to the project during the planning and programming phases requires individuals continue to interact closely throughout the design process. The client is involved to contribute their understanding of how the spaces to be reworked or added are to function once they occupy them. It is up to the architect to use their expertise to develop the programmatic requirements. There are different purposes and levels of detail that can be requested from a client. For instance, master planning is more strategic in nature. It provides information to clients, allowing them to make decisions regarding their current needs and what to be planned for in the future by helping them develop rough budgeting for implementation. Programming at the individual project level provides specific, detailed information to guide building design.',
      },
      {
        kind: 'p',
        text: 'The first step in beginning the programming process of a project is clearly identifying the individuals to be involved. Open lines of communication must be established and maintained to determine how and when meetings will be held, what the agenda will be, how contacts will be made, and how records of the meetings will be kept. It is the architect’s role to oversee and guide this process. The architect will make recommendations to the client when necessary and appropriate. The client must make the ultimate decisions to help keep the process moving forward in an efficient manner.',
      },
      {
        kind: 'p',
        text: 'The intent of following a properly structed programming process is to develop a clear set of project requirements which will be used to help guide the design of the project. While there are various different programming formats that can be followed, they all incorporate the same essential elements which follow a six-step process:',
      },
      {
        kind: 'list',
        items: [
          'Research the project type',
          'Establish goals and objectives',
          'Gather relevant information',
          'Identify strategies',
          'Determine quantitative requirements',
          'Summarize the program',
        ],
      },
    ],
  },

  'construction-administration': {
    heading: 'Construction Administration Service',
    blocks: [
      {
        kind: 'p',
        text: 'Construction administration takes place after the design has been completed, all drawings have been completed and approved by the local building department and construction begins. The client forms a contractual relationship with a contractor, and the architect serves as an ‘overseer’ of the project to ensure that it is built according to the design documents. The architect conducts periodic site visits to keep track of the project’s progression and answers any questions that may arise during construction. If necessary, the architect will review any samples that are turned in by the contractor to ensure that the materials proposed meet the projects specifications and quality standards. If any changes are needed, the architect provides documentation which goes into the project records. If requested by the client the architect may approve the contractor’s applications for payments throughout the duration of construction, based on the amount of work completed as observed during site visits.',
      },
      {
        kind: 'p',
        text: 'During the construction administration phase of a project the majority of the work shifts from the architect’s shoulders to the contractor’s. Barring any unforeseen circumstances, the architect’s role becomes that of an observer and record keeper. A schedule of regular site visits may be established for the architect to become familiar with the progress of the project. For many jobs, there may be a weekly walk-through of the progress with additional visits scheduled around particularly important phases of construction. An example would be viewing the project before the wall studs are enclosed on both sides with gypsum board to ensure any in-wall piping or wiring is present and conforms to the documents provided for the project.',
      },
      {
        kind: 'p',
        text: 'If at any time the contractor has a question about interpretation of the drawings or documents, a formal Request For Information (RFI) is submitted to the architect. The architect may get questions for additional dimensions, clarification on a drawing notation, or direction on how to resolve a specific problem. The architect may respond to such requests with written paragraphs explaining the answer, or they may choose to issue a supplemental drawing or sketch for clarification. If an RFI requires there to be a change that affects the project timeline or overall budget, the architect will have the owner approve or deny the change as a “change order”.',
      },
      {
        kind: 'p',
        text: 'In all construction projects, there are unknowns and variables that can affect the final outcome of the project. One example is if a particular product is discontinued before it could be ordered. In cases like these, the architect can act as a valuable resource, helping the owner navigate through selecting a new product, or approving a choice made by the contractor. In most cases, the architect serves as the mediator between the client and contractor in the case of a disagreement. Another important interaction that takes place throughout the construction phase is when the contractor provides submittal packages to the architect for review and approval. This process helps ensure that the quality standard set forth in the project is upheld.',
      },
      {
        kind: 'p',
        text: 'When the project is almost complete, the contractor will provide a list of items that needs to be addressed before the job is considered finished. This “punch list” of items is inspected by the architect and final payment to the contractor depends on satisfactory completion of the included items. Typically, the punch list consists of minor touch ups on items like paint or cabinetry or final installation of any missing items like hardware or appliances. If the client has a need, they can often move into their new space before the final punch list is corrected. By having a professional engaged throughout the project and provide construction administration services the client can be assured that the final delivery of the project is as smooth a transition as possible.',
      },
    ],
  },

  'geology-and-mine-engineering': {
    heading: 'Geology and Mine Engineering',
    blocks: [
      {
        kind: 'p',
        text: 'At AtlasBridge Construction, we understand that geology and mine engineering play a vital role in various construction and development projects. Our specialized Geology and Mine Engineering services are designed to provide comprehensive solutions to meet the unique needs of your project. Whether you are involved in the exploration and extraction of natural resources or require expert geological assessments for your construction project, our team of dedicated professionals is here to help.',
      },
      { kind: 'h', text: 'Our Expertise' },
      {
        kind: 'p',
        text: 'Our team of geologists and mine engineers is equipped with the knowledge and experience necessary to navigate the complexities of geological formations and mining operations. We provide a wide range of services, including:',
      },
      {
        kind: 'terms',
        items: [
          {
            term: 'Geological Assessments',
            text: 'Our geologists conduct thorough assessments to understand the geological conditions at your project site. This includes identifying rock formations, soil compositions, and potential hazards that may impact your project’s stability.',
          },
          {
            term: 'Site Characterization',
            text: 'We provide detailed site characterizations to help you make informed decisions about your project. This includes information on soil properties, groundwater levels, and geological risks.',
          },
          {
            term: 'Mining Feasibility Studies',
            text: 'For mining projects, our experts conduct comprehensive feasibility studies to determine the economic viability of your venture. We assess mineral resources, mining methods, and environmental impacts to help you make strategic decisions.',
          },
          {
            term: 'Environmental Compliance',
            text: 'We work to ensure that your project aligns with environmental regulations and best practices. Our team assists in permitting processes, environmental impact assessments, and mitigation strategies.',
          },
          {
            term: 'Geotechnical Engineering',
            text: 'We offer geotechnical engineering services to ensure the structural integrity of your project. This includes foundation design, slope stability analysis, and risk assessment.',
          },
        ],
      },
      { kind: 'h', text: 'Why Choose AtlasBridge Construction?' },
      {
        kind: 'p',
        text: 'When you partner with AtlasBridge Construction for Geology and Mine Engineering services, you benefit from:',
      },
      {
        kind: 'terms',
        items: [
          {
            term: 'Expertise',
            text: 'Our team brings a wealth of experience and knowledge in the field of geology and mine engineering.',
          },
          {
            term: 'Comprehensive Solutions',
            text: 'We offer end-to-end solutions to meet the unique needs of your project, from initial assessments to design and implementation.',
          },
          {
            term: 'Environmental Responsibility',
            text: 'We prioritize sustainable and responsible practices, ensuring that your project aligns with environmental and regulatory requirements.',
          },
          {
            term: 'Innovation',
            text: 'We leverage the latest technologies and tools to provide accurate and efficient geological and mine engineering solutions.',
          },
        ],
      },
      {
        kind: 'p',
        text: 'Whether you’re embarking on a mining project, developing infrastructure in challenging geological conditions, or need expert geological assessments, AtlasBridge Construction is your trusted partner. Contact us today to discuss your project requirements and how our Geology and Mine Engineering services can contribute to your success.',
      },
    ],
  },
}
