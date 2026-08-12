import { Img } from '@/components/ui/Img'
import { images } from '@/data/images'
import { site, telHref } from '@/data/site'

const cardTitle =
  'font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink'

export function FindUs() {
  return (
    <section id="find-us" className="relative scroll-mt-[8.5rem]">
      <Img
        slot={images.map}
        className="h-[22rem] w-full sm:h-[26rem] lg:h-[30rem]"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="shell flex h-full items-center justify-end">
          <div className="pointer-events-auto w-full max-w-xs rounded-lg bg-surface p-7 shadow-float">
            <p className={cardTitle}>Find us</p>

            <address className="mt-5 space-y-4 text-sm leading-relaxed text-body not-italic">
              <p>
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </p>
              <p>
                Phone:{' '}
                {site.phones.map((phone, index) => (
                  <span key={phone}>
                    <a
                      href={telHref(phone)}
                      className="transition-colors hover:text-ink"
                    >
                      {phone}
                    </a>
                    {index < site.phones.length - 1 && ', '}
                  </span>
                ))}
              </p>
            </address>

            <p className={`${cardTitle} mt-7`}>Business hours</p>
            <dl className="mt-4 space-y-1.5 text-sm text-body">
              {site.hours.map((entry) => (
                <div key={entry.days} className="flex gap-2">
                  <dt>{entry.days}</dt>
                  <dd>{entry.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
