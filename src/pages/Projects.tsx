import { PageHeader } from '@/components/layout/PageHeader'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { projects } from '@/data/capabilities'

export default function Projects() {
  return (
    <>
      <PageHeader index="04" title="Projects">
        A selection of recent work. Client names and figures are withheld
        pending approval.
      </PageHeader>

      <section className="shell py-20 lg:py-28">
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.id} delay={index * 110}>
              <article className="group">
                <div className="overflow-hidden bg-fog">
                  <Img
                    slot={project.image}
                    className="aspect-3/4 w-full"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mt-5 border-t border-hairline pt-5">
                  <span className="index-num text-orange">
                    {project.sector}
                  </span>
                  <h2 className="mt-3 font-display text-lg font-bold text-ink">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm">
                    {project.location} · {project.year}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20 border-t border-hairline pt-10">
          <p className="max-w-xl text-sm leading-relaxed">
            Further case studies are available on request, including scope,
            programme and outcome for projects comparable to yours.
          </p>
        </Reveal>
      </section>
    </>
  )
}
