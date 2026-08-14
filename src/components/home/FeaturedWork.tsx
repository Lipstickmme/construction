import { Link } from 'react-router-dom'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt } from '@/components/ui/Tilt'
import { projects } from '@/data/capabilities'

export function FeaturedWork() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="kicker text-white">Selected work</p>
            <h2 className="mt-6 max-w-lg text-[clamp(2rem,4.5vw,3.5rem)] text-white">
              Built where the tolerances are tight.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <Link
              to="/projects"
              className="link-wipe font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:text-orange"
            >
              All projects
            </Link>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal as="li" key={project.id} delay={index * 110}>
              <Link to="/projects" className="group block">
                <div className="relative overflow-hidden bg-black">
                  <Tilt max={6}>
                    <Img slot={project.image} className="aspect-4/3 w-full" />
                  </Tilt>
                  <span className="absolute top-4 left-4 bg-yellow px-3 py-1 font-display text-[0.65rem] font-semibold tracking-widest text-black uppercase">
                    {project.sector}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4 border-t border-white/15 pt-5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-orange">
                      {project.title}
                    </h3>
                  </div>
                  <span className="index-num shrink-0 text-concrete">
                    {project.year}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
