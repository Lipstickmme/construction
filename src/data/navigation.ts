import { services } from './services'

export type NavLink = {
  label: string
  to: string
}

export type NavItem = NavLink & {
  /** When present the item renders as a dropdown in the main nav. */
  children?: NavLink[]
}

export type NavGroup = {
  label: string
  items: NavLink[]
}

/** Sub-pages under Corporate Responsibility. */
export const responsibilityPages: NavLink[] = [
  {
    label: 'Corporate Social Responsibility',
    to: '/corporate-responsibility/csr',
  },
  {
    label: 'Diversity & Inclusion',
    to: '/corporate-responsibility/diversity-and-inclusion',
  },
  { label: 'Sustainability', to: '/corporate-responsibility/sustainability' },
]

/** Top bar — the primary site sections. */
export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: services.map((service) => ({
      label: service.navLabel,
      to: `/services#${service.id}`,
    })),
  },
  {
    label: 'Corporate Responsibility',
    to: '/corporate-responsibility',
    children: responsibilityPages,
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

/** Second bar — deep links into sections of the pages above. */
export const secondaryNav: NavGroup[] = [
  {
    label: 'Our Services',
    items: services.map((service) => ({
      label: service.navLabel,
      to: `/services#${service.id}`,
    })),
  },
  {
    label: 'Recent Projects',
    items: [
      { label: 'Public Infrastructure', to: '/services#roadworks' },
      { label: 'Commercial Developments', to: '/services#design-and-build' },
      { label: 'Historic Restoration', to: '/services#interior-design' },
      { label: 'Concrete Structures', to: '/services#roadworks' },
    ],
  },
  {
    label: 'The Process',
    items: [
      { label: 'Offering construction plans', to: '/#process' },
      { label: 'Building the project', to: '/#process' },
      { label: 'Project assignment', to: '/#process' },
      { label: 'Pre-construction services', to: '/#sustainable' },
    ],
  },
  {
    label: 'Contact',
    items: [
      { label: 'Send a message', to: '/contact#message' },
      { label: 'Request a call back', to: '/contact#call-back' },
      { label: 'Find our office', to: '/#find-us' },
      { label: 'Careers enquiries', to: '/careers' },
    ],
  },
]

/** Footer quick links, rendered as two adjacent columns. */
export const footerLinks: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'Career', to: '/careers' },
]
