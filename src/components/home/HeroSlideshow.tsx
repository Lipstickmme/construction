import { useEffect, useRef, useState } from 'react'
import { Img } from '@/components/ui/Img'
import { images } from '@/data/images'

const slides = [
  { slot: images.hero, transition: 'fade' },
  { slot: images.hero2, transition: 'slide-left' },
  { slot: images.hero3, transition: 'zoom' },
  { slot: images.hero4, transition: 'slide-up' },
] as const

const INTERVAL_MS = 5000

/** Off-screen starting position for each transition style. */
const enterFrom: Record<(typeof slides)[number]['transition'], string> = {
  fade: 'opacity-0',
  'slide-left': 'opacity-0 translate-x-8',
  zoom: 'opacity-0 scale-105',
  'slide-up': 'opacity-0 translate-y-8',
}

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
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -top-5 -right-5 h-full w-full rounded-sm bg-gold"
      />

      <div
        className="relative aspect-4/3 w-full overflow-hidden rounded-sm shadow-card"
        aria-roledescription="carousel"
        aria-label="Recent AtlasBridge projects"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.slot.src}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-all duration-[900ms] ease-out ${
              index === active
                ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                : `${enterFrom[slide.transition]} pointer-events-none`
            }`}
          >
            <Img
              slot={slide.slot}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="size-full"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.slot.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? 'w-6 bg-gold' : 'w-1.5 bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
