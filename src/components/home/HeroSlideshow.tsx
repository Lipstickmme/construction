import { useEffect, useRef, useState } from 'react'
import { Img } from '@/components/ui/Img'
import { images } from '@/data/images'

const slides = [
  { slot: images.hero, transition: 'fade' },
  { slot: images.hero2, transition: 'slide-left' },
  { slot: images.hero3, transition: 'zoom' },
  { slot: images.hero4, transition: 'slide-up' },
] as const

const INTERVAL_MS = 6000

/** Off-screen resting position for each transition style. */
const restingState: Record<(typeof slides)[number]['transition'], string> = {
  fade: 'opacity-0',
  'slide-left': 'opacity-0 translate-x-12',
  zoom: 'opacity-0 scale-110',
  'slide-up': 'opacity-0 translate-y-12',
}

/**
 * Full-bleed background slideshow for the hero. Renders as an absolutely
 * positioned layer, so the caller supplies the section box and the overlay
 * that sits on top of it.
 */
export function HeroSlideshow() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Respect users who have asked for reduced motion. Tracked separately from
  // hover so moving the pointer away can't restart it for them.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const paused = hovered || reducedMotion

  useEffect(() => {
    if (paused) return

    timer.current = setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, INTERVAL_MS)

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused])

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.slot.src}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
              index === active
                ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                : restingState[slide.transition]
            }`}
          >
            <Img
              slot={slide.slot}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              placeholder="plain"
              className="size-full"
            />
          </div>
        ))}
      </div>

      {/* Slide picker, bottom-centre over the artwork. */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.slot.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? 'w-8 bg-gold' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </>
  )
}
