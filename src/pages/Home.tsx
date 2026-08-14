import { Approach } from '@/components/home/Approach'
import { CallToAction } from '@/components/home/CallToAction'
import { CapabilityGrid } from '@/components/home/CapabilityGrid'
import { Disciplines } from '@/components/home/Disciplines'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { Hero } from '@/components/home/Hero'
import { Leadership } from '@/components/home/Leadership'
import { Marquee } from '@/components/home/Marquee'
import { Metrics } from '@/components/home/Metrics'
import { Process } from '@/components/home/Process'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <CapabilityGrid />
      <Approach />
      <FeaturedWork />
      <Metrics />
      <Leadership />
      <Disciplines />
      <Process />
      <CallToAction />
    </>
  )
}
