import { useState, type FormEvent } from 'react'
import { PageHero } from '@/components/layout/PageHero'
import { MapEmbed } from '@/components/ui/MapEmbed'
import { site, telHref } from '@/data/site'

const labelClass = 'mb-2 block text-xs text-body'
const fieldClass =
  'w-full rounded-sm border border-line bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-body/70'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  // Stub handler — point this at your form endpoint when one exists.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        crumb="Home - Contact"
        subtitle=""
        background={
          <MapEmbed className="absolute inset-0 -z-10 size-full" />
        }
      />

      <section id="page-body" className="shell pb-16 lg:pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* Pulled up so the card overlaps the map, as in the reference. */}
          <div
            id="message"
            className="relative z-10 -mt-24 scroll-mt-32 rounded-sm bg-surface p-7 shadow-float lg:-mt-32"
          >
            <h2 className="font-display text-[0.8rem] font-bold tracking-[0.1em] text-ink uppercase">
              Send a message
            </h2>

            {submitted ? (
              <p className="mt-6 text-sm leading-relaxed text-body">
                Thanks — your message is with our team. We reply to project
                enquiries within one business day.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className={labelClass}>Your name</span>
                  <input type="text" name="name" required className={fieldClass} />
                </label>

                <label className="block">
                  <span className={labelClass}>Your email</span>
                  <input type="email" name="email" required className={fieldClass} />
                </label>

                <label className="block">
                  <span className={labelClass}>Subject</span>
                  <input type="text" name="subject" className={fieldClass} />
                </label>

                <label className="block">
                  <span className={labelClass}>Your message (optional)</span>
                  <textarea name="message" rows={6} className={fieldClass} />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-navy px-6 py-3 font-display text-[0.72rem] font-semibold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          <div className="pt-8 lg:pt-24">
            <span className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase">
              Get in touch
            </span>

            <h2 className="mt-5 max-w-md font-display text-3xl leading-tight font-bold text-ink lg:text-4xl">
              We'd love to hear from you.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-body">
              Please contact us for a free quotation and tell us more about your
              project, we will get back to you shortly with a work estimate.
            </p>

            <div id="call-back" className="mt-10 grid scroll-mt-32 gap-8 sm:grid-cols-2">
              <div>
                <p className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase">
                  Give us a call
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {site.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={telHref(phone)}
                        className="text-body transition-colors hover:text-ink"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase">
                  Find us
                </p>
                <address className="mt-3 text-sm leading-relaxed text-body not-italic">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block break-all transition-colors hover:text-ink"
                  >
                    {site.email}
                  </a>
                </address>
              </div>

              <div>
                <p className="font-display text-[0.68rem] font-semibold tracking-[0.16em] text-ink uppercase">
                  Business hours
                </p>
                <dl className="mt-3 space-y-1.5 text-sm text-body">
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
        </div>
      </section>
    </>
  )
}
