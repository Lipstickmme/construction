import { useRef, useState } from 'react'
import type { ImageSlot } from '@/data/images'
import { Img } from './Img'

type TiltImageProps = {
  slot: ImageSlot
  alt?: string
  className?: string
  /** Maximum tilt in degrees at the very edge of the image. */
  max?: number
  loading?: 'lazy' | 'eager'
}

/**
 * Image that tilts towards whichever side the pointer is on, so hovering the
 * left edge dips the left edge in. Falls flat on pointer-out and on touch,
 * where there is no hover to speak of.
 */
export function TiltImage({
  slot,
  alt,
  className = '',
  max = 7,
  loading = 'lazy',
}: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Coarse pointers get no tilt — a tap would leave it stuck mid-rotation.
    if (event.pointerType !== 'mouse') return

    const box = ref.current?.getBoundingClientRect()
    if (!box) return

    // -1 at the left/top edge, +1 at the right/bottom.
    const px = (event.clientX - box.left) / box.width - 0.5
    const py = (event.clientY - box.top) / box.height - 0.5

    setTilt({ x: -py * 2 * max, y: px * 2 * max })
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt(null)}
      className={`[perspective:900px] ${className}`}
    >
      <Img
        slot={slot}
        alt={alt}
        loading={loading}
        className="size-full transition-transform duration-300 ease-out will-change-transform"
        imgClassName="pointer-events-none"
        // Inline because the angle is continuous; a class can't express it.
        style={{
          transform: tilt
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
            : undefined,
        }}
      />
    </div>
  )
}
