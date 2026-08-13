import { CallToAction } from '@/components/home/CallToAction'
import { CapabilityGrid } from '@/components/home/CapabilityGrid'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { Metrics } from '@/components/home/Metrics'
import { Process } from '@/components/home/Process'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <CapabilityGrid />
      <FeaturedWork />
      <Metrics />
      <Process />
      <CallToAction />
    </>
  )
}
