import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  value: string
  durationMs?: number
  className?: string
}

/** Splits `1200` or `170k+` into its leading number and any trailing text. */
function parse(value: string) {
  const match = value.match(/^([\d.,]+)(.*)$/)
  if (!match) return null

  const target = Number(match[1].replace(/,/g, ''))
  return Number.isFinite(target) ? { target, suffix: match[2] } : null
}

/** Counts up the first time it scrolls into view, then holds. */
export function CountUp({
  value,
  durationMs = 1900,
  className = '',
}: CountUpProps) {
  const parsed = parse(value)
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(parsed ? '0' : value)

  useEffect(() => {
    const node = ref.current
    if (!node || !parsed) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(String(parsed.target))
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1)
          // Ease-out cubic, so it decelerates into the final figure.
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(String(Math.round(parsed.target * eased)))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs])

  return (
    <span ref={ref} className={className}>
      {display}
      {parsed?.suffix}
    </span>
  )
}
