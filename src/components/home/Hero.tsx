import { useEffect, useRef, useState } from 'react'
import { Img } from '@/components/ui/Img'
import { heroEyebrow, heroSlides } from '@/data/hero'

const INTERVAL_MS = 7000

export function Hero() {
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
      setActive((current) => (current + 1) % heroSlides.length)
    }, INTERVAL_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused])

  return (
    <section
      className="relative isolate overflow-hidden"
      aria-roledescription="carousel"
      aria-label="AtlasBridge Construction"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*
        Background artwork. Each slide cross-fades while drifting, and the
        drift alternates direction slide to slide so consecutive transitions
        don't look identical.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {heroSlides.map((slide, index) => {
          const isActive = index === active
          const drift = index % 2 === 0 ? 'translate-x-4' : '-translate-x-4'

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Img
                slot={slide.image}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                placeholder="plain"
                className={`size-full transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'translate-x-0 scale-110' : `${drift} scale-100`
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Single flat wash at the reference's exact value — rgba(0,46,66,.64). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-overlay" />

      <div className="shell flex min-h-[36rem] flex-col justify-center py-24 lg:min-h-[44rem]">
        {heroSlides.map((slide, index) => {
          const isActive = index === active

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={
                isActive ? 'max-w-2xl' : 'pointer-events-none absolute max-w-2xl opacity-0'
              }
            >
              {/*
                Each line animates in on its own delay whenever the slide
                becomes active. `key` is tied to `active` so React remounts
                these nodes and the animation replays on every slide change.
                Upper lines slide in from the left, lower ones rise up.
              */}
              <div key={`eyebrow-${active}`} className={isActive ? 'anim-slide-in' : ''}>
                {/* White chip with #002C5F text, as the reference sets it. */}
                <span className="inline-block rounded-sm bg-white px-4 py-2 font-display text-[0.7rem] font-semibold tracking-[0.16em] text-blue uppercase">
                  {heroEyebrow}
                </span>
              </div>

              <h1 className="mt-5 font-display text-4xl leading-[1.08] font-bold text-white sm:text-6xl lg:text-7xl">
                <span
                  key={`lead-${active}`}
                  className={`block ${isActive ? 'anim-slide-in [animation-delay:120ms]' : ''}`}
                >
                  {slide.titleLead}
                </span>
                <span
                  key={`accent-${active}`}
                  className={`block text-gold ${isActive ? 'anim-slide-in [animation-delay:240ms]' : ''}`}
                >
                  {slide.titleAccent}
                </span>
              </h1>

              <p
                key={`body-${active}`}
                className={`mt-6 max-w-lg text-base leading-relaxed font-bold text-white/85 ${
                  isActive ? 'anim-slide-up [animation-delay:380ms]' : ''
                }`}
              >
                {slide.body}
              </p>
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
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
    </section>
  )
}
