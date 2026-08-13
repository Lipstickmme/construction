import { useState, type CSSProperties } from 'react'
import type { ImageSlot } from '@/data/images'

type ImgProps = {
  slot: ImageSlot
  alt?: string
  className?: string
  /**
   * How the image fills its box. A prop rather than a passed-in class:
   * `object-cover` and `object-contain` have equal specificity, so an
   * override would be resolved by stylesheet order rather than intent.
   */
  fit?: 'cover' | 'contain'
  imgClassName?: string
  style?: CSSProperties
  loading?: 'lazy' | 'eager'
  /** `plain` renders a flat panel with no label, for background layers. */
  placeholder?: 'panel' | 'plain'
}

/**
 * Renders an image, falling back to a labelled placeholder naming the file
 * it wants. Drop that file into `public/images/` and it appears on reload.
 */
export function Img({
  slot,
  alt,
  className = '',
  fit = 'cover',
  imgClassName = '',
  style,
  loading = 'lazy',
  placeholder = 'panel',
}: ImgProps) {
  const [failed, setFailed] = useState(false)
  const filename = slot.src.replace('/images/', '')

  if (failed) {
    if (placeholder === 'plain') {
      return (
        <div
          aria-hidden="true"
          className={`bg-graphite ${className}`}
          style={style}
          data-placeholder={filename}
        />
      )
    }

    return (
      <div
        role="img"
        aria-label={alt ?? slot.alt}
        className={`flex flex-col items-center justify-center gap-2 border border-dashed border-concrete/50 bg-fog p-5 text-center ${className}`}
        style={style}
      >
        <span className="index-num text-orange">AWAITING ARTWORK</span>
        <p className="font-display text-xs font-medium break-all text-ink">
          {filename}
        </p>
        <p className="text-[0.7rem] text-body">
          {slot.size} · drop into <code>public/images/</code>
        </p>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <img
        src={slot.src}
        alt={alt ?? slot.alt}
        loading={loading}
        onError={() => setFailed(true)}
        className={`size-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`}
      />
    </div>
  )
}
