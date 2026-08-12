import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m15 6-6 6 6 6" />
  </svg>
)

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const Plus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Minus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
)

export const Moon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.3 8.3 0 1 0 20 14.5Z" />
  </svg>
)

export const Sun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const Chat = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7.5 17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    <path d="M10 20v-7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4.5L10 22Z" />
  </svg>
)

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const Crane = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 21h9M6.5 21V8M6.5 8 3 12M6.5 8h13M19.5 8v3.5" />
    <path d="M6.5 8 10 4h6l3.5 4" />
    <path d="M19.5 11.5v3M17 14.5h5v3h-5z" />
  </svg>
)

export const Blueprint = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 3h9l5 5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    <path d="M14 3v5h5" />
    <path d="M7 12h6M7 15.5h4" />
    <path d="m17.5 14.5 3.5 3.5-2.5 2.5-3.5-3.5Z" />
  </svg>
)

export const Helmet = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 16a9 9 0 0 1 18 0" />
    <path d="M2 16h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
    <path d="M9.5 7.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2.5" />
    <path d="M9.5 7.6C8 8.6 7 10.6 7 13M14.5 7.6c1.5 1 2.5 3 2.5 5.4" />
  </svg>
)

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
)

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5.5a3.2 3.2 0 0 1 0 6.2M17.5 14.2A6.5 6.5 0 0 1 21.5 20" />
  </svg>
)

export const Handshake = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m11 8-3 3 2.2 2.2a1.5 1.5 0 0 0 2.1 0L15 10.5" />
    <path d="M2 9.5 6 6h4l2 2 2-2h4l4 3.5" />
    <path d="M22 9.5 18 15l-3.5-2.5M2 9.5 6 15l3-2" />
  </svg>
)

export const Globe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </svg>
)

export const Bulb = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 1 3.6 10.8c-.6.5-.9 1.1-.9 1.8v.4H9.3v-.4c0-.7-.3-1.3-.9-1.8A6 6 0 0 1 12 3Z" />
  </svg>
)

export const Presentation = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 4h18M4 4v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4" />
    <path d="m9 20 3-5 3 5" />
  </svg>
)

export const Facebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M14 8.5V7a1 1 0 0 1 1-1h1.5V3.2A14 14 0 0 0 14.6 3C12.3 3 10.8 4.4 10.8 7v1.5H8V12h2.8v9h3.4v-9h2.6l.5-3.5H14Z" />
  </svg>
)

export const Twitter = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M21 5.9a7 7 0 0 1-2 .6 3.5 3.5 0 0 0 1.5-2 7 7 0 0 1-2.2.9 3.5 3.5 0 0 0-6 3.2A10 10 0 0 1 4 5a3.5 3.5 0 0 0 1.1 4.7 3.4 3.4 0 0 1-1.6-.4 3.5 3.5 0 0 0 2.8 3.5 3.5 3.5 0 0 1-1.6.1 3.5 3.5 0 0 0 3.3 2.4A7 7 0 0 1 3 16.8a10 10 0 0 0 15.4-8.9A7 7 0 0 0 21 5.9Z" />
  </svg>
)

export const LinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M6.9 21H3.6V9.4h3.3V21ZM5.2 8a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM21 21h-3.3v-6c0-1.5-.6-2.4-1.8-2.4-1 0-1.5.6-1.8 1.3-.1.2-.1.6-.1.9V21H10.7s0-10.2 0-11.6H14v1.7a3.3 3.3 0 0 1 3-1.7c2.2 0 3.9 1.4 3.9 4.5V21Z" />
  </svg>
)

export type SocialName = 'Twitter' | 'Facebook' | 'LinkedIn'

export function SocialIcon({
  name,
  ...props
}: IconProps & { name: SocialName }) {
  if (name === 'Twitter') return <Twitter {...props} />
  if (name === 'Facebook') return <Facebook {...props} />
  return <LinkedIn {...props} />
}

export type OfferingIconName = 'crane' | 'blueprint' | 'helmet'

/** Picks the illustrative icon for an entry in `offerings`. */
export function OfferingIcon({
  name,
  ...props
}: IconProps & { name: OfferingIconName }) {
  if (name === 'crane') return <Crane {...props} />
  if (name === 'blueprint') return <Blueprint {...props} />
  return <Helmet {...props} />
}
