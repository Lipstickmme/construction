/**
 * Company details.
 *
 * Contact is the enquiry mailbox only, no address and no phone number. Form
 * submissions are delivered to the same address by `api/submit-form.ts`, so
 * this constant and the `FORM_TO` environment variable should stay in step.
 */
export const site = {
  name: 'Axis',
  suffix: 'Construction',
  /** One line, used in the drawer and the footer. */
  positioning: 'Construction & engineering for oil and gas',
  descriptor:
    'A general construction contractor with its centre of gravity in oil and gas. Energy facilities, offshore assets, civil infrastructure, structures and buildings, delivered by one accountable team.',
  founded: '1998',

  contact: {
    email: 'Contact@axisconstructionltd.com',
  },

  /** Leadership note on the home page. */
  leader: {
    name: 'Christopher Wojcik',
    role: 'Chief Executive Officer',
    quote:
      'Every project we take on is somebody else\u2019s critical path. That is the standard we hold ourselves to.',
    bio: 'Twenty-five years across oil and gas, civil infrastructure and structures. Started on the tools, and still on site more weeks than not.',
  },

} as const

/** Convenience re-export — leadership block used by the home page. */
export const leader = site.leader
