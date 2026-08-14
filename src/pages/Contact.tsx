import { PageHeader } from '@/components/layout/PageHeader'
import { FormSuccess } from '@/components/ui/FormStatus'
import { useSimulatedSubmit } from '@/hooks/useSimulatedSubmit'
import { Reveal } from '@/components/ui/Reveal'
import { capabilities } from '@/data/capabilities'
import { images } from '@/data/images'
import { site } from '@/data/site'

const fieldClass =
  'w-full border border-hairline bg-surface px-4 py-3.5 text-sm text-ink transition-colors focus:border-orange focus:outline-none'
const labelClass = 'index-num mb-2 block text-concrete uppercase'

export default function Contact() {
  const { state, submit, reset } = useSimulatedSubmit()

  return (
    <>
      <PageHeader
        underlay={images.interiorFitout}
        index="06"
        title="Start a conversation."
      >
        Tell us the scope, the site and the window. We will come back with what
        it actually takes.
      </PageHeader>

      <section className="shell grid gap-16 py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-24 lg:py-28">
        <Reveal>
          {state === 'sent' ? (
            <FormSuccess
              title="Enquiry sent"
              body="Thanks — your enquiry is with our team. We reply to project enquiries within one business day."
              onReset={reset}
              resetLabel="Send another enquiry"
            />
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Name</span>
                  <input type="text" name="name" required className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>Company</span>
                  <input type="text" name="company" className={fieldClass} />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Email</span>
                  <input type="email" name="email" required className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>Phone</span>
                  <input type="tel" name="phone" className={fieldClass} />
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Discipline</span>
                <select name="discipline" className={fieldClass}>
                  <option value="">Select a capability</option>
                  {capabilities.map((capability) => (
                    <option key={capability.id} value={capability.id}>
                      {capability.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>Scope</span>
                <textarea name="scope" rows={6} required className={fieldClass} />
              </label>

              <button
                type="submit"
                disabled={state === 'sending'}
                className="group inline-flex items-center gap-4 bg-black px-9 py-5 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-orange disabled:opacity-70"
              >
                {state === 'sending' ? 'Sending…' : 'Send enquiry'}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={140}>
          <div className="border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Email</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-wipe mt-2 inline-block font-display text-lg font-medium text-ink"
            >
              {site.contact.email}
            </a>
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Telephone</p>
            <a
              href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
              className="link-wipe mt-2 inline-block font-display text-lg font-medium text-ink"
            >
              {site.contact.phone}
            </a>
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Enquiries</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Project enquiries are answered within one business day. For
              anything time-critical, call rather than email — someone from the
              relevant discipline will come back to you the same day.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
