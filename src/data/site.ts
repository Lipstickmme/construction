/**
 * Company details.
 *
 * Contact is an email and a phone number only — no address anywhere on the
 * site. Both values are stand-ins; replace the `contact` block when the real
 * ones exist and every page follows.
 */
export const site = {
  name: 'Axis',
  suffix: 'Construction',
  /** One line, used in the drawer and the footer. */
  positioning: 'Construction & engineering for oil and gas',
  descriptor:
    'A general construction contractor with its centre of gravity in oil and gas. Energy facilities, offshore assets, civil infrastructure, structures and buildings — delivered by one accountable team.',
  founded: '1998',

  contact: {
    email: 'hello@axis.example',
    phone: '+00 000 0000 000',
  },

  /** Leadership note on the home page. */
  leader: {
    name: 'Christopher Wojcik',
    role: 'Chief Executive Officer',
    quote:
      'Every project we take on is somebody else\u2019s critical path. That is the standard we hold ourselves to.',
    bio: 'Twenty-five years across oil and gas, civil infrastructure and structures — starting on the tools, and still on site more weeks than not.',
  },

  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
} as const

/** Convenience re-export — leadership block used by the home page. */
export const leader = site.leader
