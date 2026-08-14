import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { FormSuccess } from '@/components/ui/FormStatus'
import { useSimulatedSubmit } from '@/hooks/useSimulatedSubmit'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt } from '@/components/ui/Tilt'
import { images } from '@/data/images'

const fieldClass =
  'w-full border border-hairline bg-surface px-4 py-3.5 text-sm text-ink transition-colors focus:border-orange focus:outline-none'
const labelClass = 'index-num mb-2 block text-concrete uppercase'

const roles = [
  { title: 'Pipefitter', discipline: 'Mechanical', type: 'Contract' },
  { title: 'Coded Welder', discipline: 'Fabrication', type: 'Contract' },
  { title: 'Site Supervisor', discipline: 'Construction', type: 'Permanent' },
  { title: 'Planner', discipline: 'Turnaround', type: 'Permanent' },
  { title: 'HSE Advisor', discipline: 'Safety', type: 'Permanent' },
  { title: 'Apprentice Fabricator', discipline: 'Fabrication', type: 'Apprenticeship' },
]

export default function Careers() {
  const [selected, setSelected] = useState<string | null>(null)
  const { state, submit, reset } = useSimulatedSubmit()

  const openRole = (title: string) => {
    setSelected(title)
    reset()
    // Bring the form into view once it has rendered.
    requestAnimationFrame(() =>
      document.getElementById('apply')?.scrollIntoView({ block: 'center' }),
    )
  }

  return (
    <>
      <PageHeader underlay={images.siteReview} index="05" title="Work on plant that matters.">
        We hire tradespeople, supervisors and engineers who would rather do it
        properly than do it twice.
      </PageHeader>

      <section className="shell py-20 lg:py-28">
        <Reveal className="mb-16">
          <Tilt max={4}>
            <Img slot={images.careers} className="aspect-21/9 w-full" />
          </Tilt>
        </Reveal>

        <Reveal>
          <p className="kicker text-ink">Open roles</p>
        </Reveal>

        <ul className="mt-10 border-t border-hairline">
          {roles.map((role, index) => (
            <Reveal
              as="li"
              key={role.title}
              delay={index * 60}
              className="group border-b border-hairline"
            >
              <button
                type="button"
                onClick={() => openRole(role.title)}
                className="grid w-full items-center gap-4 py-7 text-left transition-colors duration-500 hover:bg-fog sm:grid-cols-[1fr_auto_auto] sm:gap-10 sm:px-6"
              >
                <h2 className="font-display text-xl font-bold text-ink transition-transform duration-500 group-hover:translate-x-1.5">
                  {role.title}
                </h2>
                <span className="text-sm">{role.discipline}</span>
                <span className="index-num text-orange uppercase">
                  {role.type}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <div id="apply" className="mt-16 scroll-mt-32">
          {state === 'sent' ? (
            <FormSuccess
              title="Application received"
              body={`Thanks — your application for ${selected ?? 'the role'} is with our team. We review every application and come back within five working days.`}
              onReset={() => {
                reset()
                setSelected(null)
              }}
              resetLabel="Apply for another role"
            />
          ) : selected ? (
            <div className="border border-hairline bg-fog p-8 lg:p-10">
              <p className="index-num text-orange uppercase">Applying for</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink">
                {selected}
              </h2>

              <form onSubmit={submit} className="mt-8 max-w-xl space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Name</span>
                    <input type="text" name="name" required className={fieldClass} />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Email</span>
                    <input type="email" name="email" required className={fieldClass} />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>Experience</span>
                  <textarea name="experience" rows={5} required className={fieldClass} />
                </label>

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="group inline-flex items-center gap-4 bg-black px-9 py-5 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-orange disabled:opacity-70"
                >
                  {state === 'sending' ? 'Sending…' : 'Submit application'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </button>
              </form>
            </div>
          ) : (
            <p className="max-w-xl text-sm leading-relaxed">
              Pick a role above to apply. Nothing listed that fits? We keep a
              live register and call people first when a project mobilises.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
