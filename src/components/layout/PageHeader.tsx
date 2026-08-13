import type { ReactNode } from 'react'

type PageHeaderProps = {
  index: string
  title: string
  children?: ReactNode
}

/** Shared masthead for every inner page — black band, index, big title. */
export function PageHeader({ index, title, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-black pt-40 pb-20 lg:pt-48 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div className="shell relative">
        <span className="index-num text-orange">{index}</span>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] text-white">
          {title}
        </h1>
        {children && (
          <div className="mt-8 max-w-xl text-base leading-relaxed text-white/70">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
