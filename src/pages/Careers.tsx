import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

const roles = [
  { title: 'Pipefitter', discipline: 'Mechanical', type: 'Contract' },
  { title: 'Coded Welder', discipline: 'Fabrication', type: 'Contract' },
  { title: 'Site Supervisor', discipline: 'Construction', type: 'Permanent' },
  { title: 'Planner', discipline: 'Turnaround', type: 'Permanent' },
  { title: 'HSE Advisor', discipline: 'Safety', type: 'Permanent' },
  { title: 'Apprentice Fabricator', discipline: 'Fabrication', type: 'Apprenticeship' },
]

export default function Careers() {
  return (
    <>
      <PageHeader index="05" title="Work on plant that matters.">
        We hire tradespeople, supervisors and engineers who would rather do it
        properly than do it twice.
      </PageHeader>

      <section className="shell py-20 lg:py-28">
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
              <Link
                to="/contact"
                className="grid items-center gap-4 py-7 transition-colors duration-500 hover:bg-fog sm:grid-cols-[1fr_auto_auto] sm:gap-10 sm:px-6"
              >
                <h2 className="font-display text-xl font-bold text-ink transition-transform duration-500 group-hover:translate-x-1.5">
                  {role.title}
                </h2>
                <span className="text-sm">{role.discipline}</span>
                <span className="index-num text-orange uppercase">
                  {role.type}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16">
          <p className="max-w-xl text-sm leading-relaxed">
            Nothing listed that fits? Send us what you do. We keep a live
            register and call people first when a project mobilises.
          </p>
        </Reveal>
      </section>
    </>
  )
}
