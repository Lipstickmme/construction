import { capabilities } from './capabilities'

export type NavLink = {
  label: string
  to: string
}

export type NavItem = NavLink & {
  /** Zero-padded index shown in the drawer. */
  index: string
  children?: NavLink[]
}

export const mainNav: NavItem[] = [
  { index: '01', label: 'Home', to: '/' },
  { index: '02', label: 'About', to: '/about' },
  {
    index: '03',
    label: 'Capabilities',
    to: '/capabilities',
    children: capabilities.map((capability) => ({
      label: capability.title,
      to: `/capabilities/${capability.id}`,
    })),
  },
  { index: '04', label: 'Projects', to: '/projects' },
  { index: '05', label: 'Careers', to: '/careers' },
  { index: '06', label: 'Contact', to: '/contact' },
]

export const footerNav: NavLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Projects', to: '/projects' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]
