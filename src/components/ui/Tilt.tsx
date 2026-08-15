import { useRef, useState, type ReactNode } from 'react'

type TiltProps = {
  children: ReactNode
  /** Maximum tilt in degrees at the very edge. Keep it small on text. */
  max?: number
  /** Slight lift on hover, on top of the rotation. */
  scale?: number
  className?: string
}

/**
 * Tilts its children towards whichever side the pointer is on, so hovering
 * the left edge dips the left edge in. Mouse only: a coarse pointer would leave
 * the element stuck at an angle after a tap.
 */
export function Tilt({
  children,
  max = 6,
  scale = 1.02,
  className = '',
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return

    const box = ref.current?.getBoundingClientRect()
    if (!box) return

    // -0.5 at the left/top edge, +0.5 at the right/bottom.
    const px = (event.clientX - box.left) / box.width - 0.5
    const py = (event.clientY - box.top) / box.height - 0.5

    setTilt({ x: -py * 2 * max, y: px * 2 * max })
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt(null)}
      className={`[perspective:1000px] ${className}`}
    >
      <div
        className="transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: tilt
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}
