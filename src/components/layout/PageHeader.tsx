import type { ReactNode } from 'react'
import { Img } from '@/components/ui/Img'
import { Tilt } from '@/components/ui/Tilt'
import type { ImageSlot } from '@/data/images'

type PageHeaderProps = {
  index: string
  title: string
  /** Photograph underlaying the masthead, as on the home hero. */
  underlay: ImageSlot
  children?: ReactNode
}

/** Shared masthead: photograph under a wash, index, then the big title. */
export function PageHeader({
  index,
  title,
  underlay,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-black pt-40 pb-20 lg:pt-48 lg:pb-24">
      <Img
        slot={underlay}
        alt=""
        loading="eager"
        placeholder="plain"
        className="absolute inset-0 -z-20 size-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/80 to-black/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div className="shell relative">
        <Tilt max={4} scale={1} className="block w-fit">
          <span className="index-num text-orange">{index}</span>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] text-white">
            {title}
          </h1>
        </Tilt>

        {children && (
          <div className="mt-8 max-w-xl text-base leading-relaxed text-white/70">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
