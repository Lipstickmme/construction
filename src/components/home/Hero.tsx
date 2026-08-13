import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '@/components/ui/Img'
import { images } from '@/data/images'
import { site } from '@/data/site'

const headlineLines = ['Heavy industry', 'runs on', 'precision.']

export function Hero() {
  const [entered, setEntered] = useState(false)

  // Kick the entrance on mount rather than on scroll — this is above the fold.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-black pt-32 pb-14">
      {/* Wide crop sits behind everything; until it exists the panel is flat
          graphite, which the type still reads cleanly against. */}
      <Img
        slot={images.heroWide}
        alt=""
        loading="eager"
        placeholder="plain"
        className="absolute inset-0 -z-20 size-full opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/75 to-black/40"
      />

      {/* Faint survey grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div className="shell">
        <p
          className="kicker text-white transition-all duration-700"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'none' : 'translateY(1rem)',
          }}
        >
          {site.positioning}
        </p>

        <h1 className="mt-8 font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold text-white">
          {headlineLines.map((line, index) => (
            <span key={line} className="line-mask">
              <span
                style={{
                  transform: entered ? 'none' : 'translateY(110%)',
                  transitionDelay: `${120 + index * 110}ms`,
                }}
                className={index === 2 ? 'text-orange' : undefined}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="mt-12 flex flex-col gap-10 border-t border-white/15 pt-8 transition-all duration-700 lg:flex-row lg:items-end lg:justify-between"
          style={{
            transitionDelay: '520ms',
            opacity: entered ? 1 : 0,
            transform: entered ? 'none' : 'translateY(1.25rem)',
          }}
        >
          <p className="max-w-md text-base leading-relaxed text-white/70">
            {site.descriptor}
          </p>

          <Link
            to="/capabilities"
            className="group inline-flex shrink-0 items-center gap-4 bg-orange px-8 py-5 font-display text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white hover:text-black"
          >
            View capabilities
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
