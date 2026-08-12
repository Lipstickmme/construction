import { Accordion } from '@/components/ui/Accordion'
import { Img } from '@/components/ui/Img'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { images } from '@/data/images'
import { disciplines } from '@/data/services'

export function Infrastructure() {
  return (
    <section id="infrastructure" className="shell py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 h-full w-full rounded-sm bg-gold"
          />
          <Img
            slot={images.infrastructure}
            className="relative aspect-3/4 w-full rounded-sm shadow-card"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Construction"
            title={
              <>
                Modern City
                <br />
                Infrastructure
                <br />
                <span className="highlight-gold">Construction</span>
              </>
            }
          />

          <Accordion items={disciplines} className="mt-10" />
        </div>
      </div>
    </section>
  )
}
