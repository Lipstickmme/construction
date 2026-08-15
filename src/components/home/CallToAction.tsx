import { Link } from 'react-router-dom'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/data/images'

export function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <Img
        slot={images.gasFacility}
        alt=""
        placeholder="plain"
        className="absolute inset-0 -z-10 size-full opacity-30"
      />

      <div className="shell py-24 text-center lg:py-32">
        <Reveal>
          <p className="kicker justify-center text-white">Next step</p>
          <h2 className="mx-auto mt-8 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] text-white">
            Tell us what needs building.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70">
            Send us the scope, the site and the window you have to work in
            and we will tell you what it really takes.
          </p>

          <Link
            to="/contact"
            className="group mt-12 inline-flex items-center gap-4 bg-orange px-10 py-5 font-display text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-yellow hover:text-black"
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
