/**
 * Company details.
 *
 * Contact is an email and a phone number only — no address anywhere on the
 * site. Both values are deliberate placeholders; replace the `contact` block
 * when the real ones exist and every page follows.
 */
export const site = {
  name: 'Axis',
  suffix: 'Construction',
  /** One line, used in the drawer and the footer. */
  positioning: 'Construction & engineering · Oil and gas',
  descriptor:
    'A general construction contractor with its centre of gravity in oil and gas. Energy facilities, offshore assets, civil infrastructure, structures and buildings — delivered by one accountable team.',
  founded: '1998',

  contact: {
    email: 'hello@axis.example',
    phone: '+00 000 0000 000',
  },

  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
} as const

/** Marks a value as intentionally unset, so it can be styled as such. */
export const isPlaceholder = true
