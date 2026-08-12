import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  /** Aligns the block; sections in the reference use both. */
  align?: 'left' | 'center'
  /** `light` is for the navy sections. */
  tone?: 'dark' | 'light'
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  tone = 'dark',
  className = '',
  children,
}: SectionHeadingProps) {
  const isLight = tone === 'light'

  return (
    <div
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <span
          className={
            isLight
              ? 'eyebrow bg-white/10 text-white'
              : 'eyebrow dark:bg-white/5 dark:text-white'
          }
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-5 font-display text-3xl leading-[1.2] font-bold sm:text-4xl lg:text-[2.7rem] ${
          isLight ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {children && (
        <div
          className={`mt-4 max-w-xl text-[0.95rem] leading-relaxed ${
            isLight ? 'text-white/70' : 'text-body'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
