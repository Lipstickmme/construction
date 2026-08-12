export type AboutPanel = {
  id: string
  title: string
  body: string
}

/** Accordion beside the leadership portrait. */
export const aboutPanels: AboutPanel[] = [
  {
    id: 'why-choose-us',
    title: 'Why Choose Us',
    body: 'At AtlasBridge Construction, we understand that a strong foundation is the key to safety, functionality, and sustainability in every aspect of our work. Our team of skilled engineers, technicians, and construction professionals collaborate closely with clients, architects, and stakeholders to ensure that the project’s objectives are met with the highest standards of quality.',
  },
  {
    id: 'vision-statement',
    title: 'Vision Statement',
    body: 'To be the partner cities turn to when the work has to outlast us — infrastructure that stays safe, serviceable and worth maintaining decades after handover.',
  },
  {
    id: 'mission-statement',
    title: 'Mission Statement',
    body: 'To deliver every project on an honest programme and an honest budget, with the people who priced the work still standing on site when it is built.',
  },
]

export type ValueCard = {
  icon: 'users' | 'handshake' | 'globe' | 'bulb'
  title: string
  body: string
}

export const valueCards: ValueCard[] = [
  {
    icon: 'users',
    title: 'Dedicated Teams',
    body: 'Committed to helping its clients reach their goals, to personalising their experiences.',
  },
  {
    icon: 'handshake',
    title: 'True Partners',
    body: 'Our strong sense of identification with client projects means that we are constantly striving.',
  },
  {
    icon: 'globe',
    title: 'Global Know-how',
    body: "They aren't yet aware, we adopt progressive approach to technology and marketing techniques.",
  },
  {
    icon: 'bulb',
    title: 'Focus On Innovation',
    body: 'This sense of identification also means we value and promote seamless interaction.',
  },
]

export type Stat = {
  icon: 'presentation' | 'chat' | 'users' | 'bulb'
  value: string
  label: string
}

export const stats: Stat[] = [
  { icon: 'presentation', value: '290+', label: 'Business Presentations' },
  { icon: 'chat', value: '200+', label: 'Finished Projects' },
  { icon: 'users', value: '170k+', label: 'Happy Clients' },
  { icon: 'bulb', value: '500+', label: 'Experienced Experts' },
]

export const leader = {
  name: 'Andreas Wojcik',
  role: 'CEO',
}

export const aboutIntro = [
  'Welcome to AtlasBridge Construction!',
  'At AtlasBridge Construction, we are dedicated to delivering exceptional construction solutions that surpass the expectations of our clients. With our steadfast commitment to quality, innovation, and client satisfaction, we have solidified our position as a leading construction company in the industry.',
  "Our team comprises highly skilled professionals offering a diverse array of services, enabling us to provide comprehensive construction solutions to cater to the needs of various sectors. Whether it's public infrastructure or private development projects, we possess the knowledge and experience to handle projects of any scale and complexity. Our expertise primarily focuses on civil engineering, encompassing the design and construction of structures such as bridges, roads, dams, and highways. Additionally, we offer engineering support for city planning and structural design activities, ensuring the development of sustainable and functional urban environments.",
]
