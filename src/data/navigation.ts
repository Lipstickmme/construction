import { services } from './services'

export type NavLink = {
  label: string
  to: string
}

export type NavItem = NavLink & {
  /** When present the item renders as a dropdown in the main nav. */
  children?: NavLink[]
}

/** Sub-pages under Corporate Responsibility, in the reference's order. */
export const responsibilityPages: NavLink[] = [
  { label: 'Sustainability', to: '/corporate-responsibility/sustainability' },
  {
    label: 'Corporate Social Responsibility',
    to: '/corporate-responsibility/csr',
  },
  {
    label: 'Diversity & Inclusion',
    to: '/corporate-responsibility/diversity-and-inclusion',
  },
]

/** Top bar — the primary site sections. */
export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: services.map((service) => ({
      label: service.title,
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

/**
 * The bar that sits directly under the hero. Each entry scrolls the page to a
 * section further down, and highlights itself while that section is in view —
 * `targetId` must match the `id` on the corresponding home-page section.
 */
export type SectionLink = {
  label: string
  targetId: string
}

export const sectionNav: SectionLink[] = [
  { label: 'Our Services', targetId: 'services' },
  { label: 'Recent Projects', targetId: 'projects' },
  { label: 'The Process', targetId: 'process' },
  { label: 'Contact', targetId: 'contact' },
]

/** Footer quick links, rendered as two adjacent columns. */
export const footerLinks: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'Career', to: '/careers' },
]
