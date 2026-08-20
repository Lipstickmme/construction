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
    'We are a general contractor and most of our work is oil and gas. Energy facilities, offshore assets, civils, structures and buildings. One team carries the whole job.',
  founded: '1998',

  contact: {
    email: 'Contact@axisconstructionsltd.com',
  },

  /** Leadership note on the home page. */
  leader: {
    name: 'Christopher Wojcik',
    role: 'Chief Executive Officer',
    quote:
      'Every job we take on is somebody else\u2019s critical path. We try hard not to forget that.',
    bio: 'Twenty-five years in oil and gas, civils and structures. Started on the tools and still ends up on site most weeks.',
  },

} as const

/** Convenience re-export of the leadership block used by the home page. */
export const leader = site.leader
