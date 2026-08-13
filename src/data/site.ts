import type { SocialName } from '@/components/ui/Icon'

export const site = {
  name: 'AtlasBridge',
  nameSuffix: 'Construction',
  tagline: 'Building the idea of future',
  /** Sub-heading under every inner-page hero title. */
  heroSubtitle: 'We design and construct infrastructures to perfection!',
  about:
    "We provide extensive construction solutions that cater to diverse sectors. Whether it's public infrastructure or private development projects, we possess the expertise and experience to manage projects of all sizes and intricacies. Our specialization lies in civil engineering, covering the planning and construction of various structures, including bridges, roads, dams, and highways. Additionally, we offer engineering support for urban planning and structural design, contributing to the creation of sustainable and functional urban environments.",
  address: ['40 Creek St, Brisbane City QLD 4000,', 'Australia'],
  email: 'info@atlasbridgeconstruction.com',
  phones: [
    '+1-415-598-4449',
    '+1-702-886-8324',
    '+44-744-881-3665',
    '+61-4-2211-6255',
  ],
  hours: [
    { days: 'Mon - Fri', time: '8am - 9pm' },
    { days: 'Sat - Sun', time: 'Closed' },
  ],
  /** Icon links, used in the top bar and the footer's bottom strip. */
  socials: [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'LinkedIn' },
  ] satisfies { label: string; href: string; icon: SocialName }[],
  /** Text links in the footer's Quick Links column. */
  socialLinks: [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Medium', href: 'https://medium.com' },
  ],
} as const

/** `tel:` links need the punctuation stripped. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`
