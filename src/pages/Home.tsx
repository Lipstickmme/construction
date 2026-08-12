import { FindUs } from '@/components/home/FindUs'
import { Hero } from '@/components/home/Hero'
import { Infrastructure } from '@/components/home/Infrastructure'
import { ServicesRail } from '@/components/home/ServicesRail'
import { Sustainable } from '@/components/home/Sustainable'
import { WhatWeDo } from '@/components/home/WhatWeDo'

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <ServicesRail />
      <Sustainable />
      <Infrastructure />
      <FindUs />
    </>
  )
}
