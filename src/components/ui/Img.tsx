import { useState } from 'react'
import type { ImageSlot } from '@/data/images'

type ImgProps = {
  /** An entry from `src/data/images.ts`. */
  slot: ImageSlot
  /** Overrides the slot's default alt text. */
  alt?: string
  className?: string
  /**
   * How the image fills its box. Must be a prop rather than a class passed
   * through `imgClassName`: `object-cover` and `object-contain` have equal
   * CSS specificity, so a passed-in override loses or wins by stylesheet
   * order rather than by intent.
   */
  fit?: 'cover' | 'contain'
  /** Extra classes for the <img> itself; the wrapper handles layout. */
  imgClassName?: string
  loading?: 'lazy' | 'eager'
  /**
   * How the missing-file placeholder is drawn:
   * - `panel`   full dashed panel with filename and target size (default)
   * - `compact` filename only — for small boxes like the logo strip
   * - `plain`   flat surface, no text — for images used as a background layer
   *   behind a colour wash, where a label would show through
   */
  placeholder?: 'panel' | 'compact' | 'plain'
}

/**
 * Renders an image, falling back to a labelled placeholder when the file is
 * missing. Every image on the site is currently a placeholder — add the file
 * named in the panel to `public/images/` and it swaps itself in.
 */
export function Img({
  slot,
  alt,
  className = '',
  fit = 'cover',
  imgClassName = '',
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
          className={`bg-mist ${className}`}
          data-placeholder={filename}
        />
      )
    }

    return (
      <div
        role="img"
        aria-label={alt ?? slot.alt}
        className={`flex flex-col items-center justify-center gap-1.5 overflow-hidden border-2 border-dashed border-line bg-surface-muted p-3 text-center ${className}`}
      >
        {placeholder === 'panel' && (
          <svg
            viewBox="0 0 24 24"
            className="size-8 text-body/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="m4 17 4.5-5 3.5 4 3-2.5L20 17" />
          </svg>
        )}

        <p className="font-display text-[0.7rem] leading-tight font-semibold break-all text-ink">
          {filename}
        </p>

        {placeholder === 'panel' && (
          <p className="text-[0.7rem] leading-relaxed text-body/80">
            {slot.size} · drop into <code>public/images/</code>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
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
