import { Link } from 'react-router-dom'
import { PageHero } from '@/components/layout/PageHero'
import { ArrowRight } from '@/components/ui/Icon'
import { Img } from '@/components/ui/Img'
import { images } from '@/data/images'

const sections = [
  {
    heading: 'Why work for us?',
    body: 'At AtlasBridge Construction, we recognize that the growth of our employees is critical to the growth of our company and that the hard work and dedication of our people has allowed us to expand and grow for over 10 years. We understand the necessity in investing in our people and recognizing their individual achievements.',
  },
  {
    heading: 'Our Team',
    body: 'Teamwork is the foundation of our success and we strive to provide an environment that fosters communication, collaboration and new ideas. We want to make sure everyone’s voice is heard, all ideas are considered and each and every one of our employees is given the tools to reach their full potential.',
  },
  {
    heading: 'Join Our Team',
    body: 'Are you someone with a “let’s get it done” attitude with a focus on continuous improvement? Do you thrive in an environment where you are challenged to think outside the box? Do you show integrity in your work and take responsibility? Most importantly, are you someone who puts safety of yourself and others above all else?',
  },
]

const roles = [
  { title: 'Site Engineer — Bridges', location: 'Brisbane, QLD', type: 'Full time' },
  { title: 'Project Manager — Roadworks', location: 'Brisbane, QLD', type: 'Full time' },
  { title: 'Quantity Surveyor', location: 'Hybrid', type: 'Full time' },
  { title: 'Apprentice Formworker', location: 'Multiple sites', type: 'Apprenticeship' },
]

export default function Careers() {
  return (
    <>
      <PageHero title="Careers" crumb="Home - Careers" />

      <section id="page-body" className="shell py-14 lg:py-16">
        <Img
          slot={images.careersTeam}
          className="mx-auto aspect-16/9 w-full max-w-3xl rounded-sm"
          imgClassName="object-contain"
        />

        <div className="mt-12">
          {sections.map((section) => (
            <div key={section.heading} className="mt-8 first:mt-0">
              <h2 className="font-display text-base font-bold text-ink">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#open-roles"
            className="inline-flex items-center gap-2 rounded-md bg-navy px-7 py-3.5 font-display text-[0.78rem] font-semibold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5"
          >
            Join Our Team
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <section id="open-roles" className="shell scroll-mt-32 pb-16 lg:pb-20">
        <h2 className="font-display text-2xl font-bold text-ink">Open roles</h2>

        <ul className="mt-8 divide-y divide-line border-y border-line">
          {roles.map((role) => (
            <li
              key={role.title}
              className="flex flex-wrap items-center justify-between gap-4 py-6"
            >
              <div>
                <h3 className="font-display text-base font-bold text-ink">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-body">
                  {role.location} · {role.type}
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 font-display text-[0.72rem] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-surface-muted"
              >
                Apply
                <ArrowRight className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
