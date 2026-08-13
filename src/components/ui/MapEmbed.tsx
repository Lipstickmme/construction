import { site } from '@/data/site'

const query = site.address.join(' ')

/**
 * Live Google Maps embed of the office. The `output=embed` form needs no API
 * key; swap in a Maps Embed API URL if you want styling control or usage
 * reporting.
 */
export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <iframe
      title="AtlasBridge Construction office location"
      src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`border-0 ${className}`}
    />
  )
}
