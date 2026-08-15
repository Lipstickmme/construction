import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Milliseconds to hold before this element animates, for stagger. */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'header'
}

/**
 * Fades and lifts its children in the first time they enter the viewport,
 * then stops observing. Stagger by passing an increasing `delay`.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setVisible(true)
        observer.disconnect()
      },
      // Trigger a little before the element is fully on screen.
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
