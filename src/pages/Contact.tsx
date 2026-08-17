import { PageHeader } from '@/components/layout/PageHeader'
import { FormError, FormSuccess, Honeypot } from '@/components/ui/FormStatus'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { Reveal } from '@/components/ui/Reveal'
import { capabilities } from '@/data/capabilities'
import { images } from '@/data/images'
import { site } from '@/data/site'

const fieldClass =
  'w-full border border-hairline bg-surface px-4 py-3.5 text-sm text-ink transition-colors focus:border-orange focus:outline-none'
const labelClass = 'index-num mb-2 block text-concrete uppercase'

export default function Contact() {
  const { state, error, submit, reset } = useFormSubmit({ kind: 'enquiry' })

  return (
    <>
      <PageHeader
        underlay={images.interiorFitout}
        index="06"
        title="Get in touch."
      >
        Tell us the scope, the site and the window you are working to, and we
        will come back with what the job really takes.
      </PageHeader>

      <section className="shell grid gap-16 py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-24 lg:py-28">
        <Reveal>
          {state === 'sent' ? (
            <FormSuccess
              title="Enquiry sent"
              body="Thanks, that has reached us. We answer project enquiries inside one working day."
              onReset={reset}
              resetLabel="Send another enquiry"
            />
          ) : (
            <form onSubmit={submit} className="relative space-y-6">
              <Honeypot />

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
                  {/* Value is the title, not the slug: it goes straight into
                      the notification email and the dashboard. */}
                  {capabilities.map((capability) => (
                    <option key={capability.id} value={capability.title}>
                      {capability.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>Scope</span>
                <textarea name="scope" rows={6} required className={fieldClass} />
              </label>

              {error && <FormError message={error} />}

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
            <p className="index-num text-concrete uppercase">Phone</p>
            <a
              href={site.contact.phoneHref}
              className="link-wipe mt-2 inline-block font-display text-lg font-medium text-ink"
            >
              {site.contact.phone}
            </a>
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="index-num text-concrete uppercase">Enquiries</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              We answer project enquiries inside one working day, and whoever
              comes back to you will be from the discipline you need. If it is
              a quick question, call the number above or use the chat box in
              the corner.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
