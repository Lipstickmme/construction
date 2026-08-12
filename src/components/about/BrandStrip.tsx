import { Img } from '@/components/ui/Img'
import { brandLogos } from '@/data/images'

export function BrandStrip() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="shell flex flex-wrap items-center justify-between gap-8 py-10">
        <p className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase">
          Trusted by global brands
        </p>

        <ul className="flex flex-1 flex-wrap items-center justify-around gap-8">
          {brandLogos.map((logo) => (
            <li key={logo.src}>
              <Img
                slot={logo}
                placeholder="compact"
                className="h-12 w-32 opacity-70"
                imgClassName="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
