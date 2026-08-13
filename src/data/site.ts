/**
 * Company details.
 *
 * Every contact value here is a deliberate placeholder — no real address,
 * phone number or inbox. Replace the whole `contact` block when the real
 * details exist; nothing else needs to change.
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
    address: ['000 Placeholder Way', 'City, Region 00000', 'Country'],
    hours: 'Mon – Fri, 08:00 – 18:00',
  },

  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
} as const

/** Marks a value as intentionally unset, so it can be styled as such. */
export const isPlaceholder = true
