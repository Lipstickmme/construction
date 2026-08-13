import { FindUs } from '@/components/home/FindUs'
import { Hero } from '@/components/home/Hero'
import { Infrastructure } from '@/components/home/Infrastructure'
import { ProjectPrompt } from '@/components/home/ProjectPrompt'
import { SectionNav } from '@/components/home/SectionNav'
import { ServicesRail } from '@/components/home/ServicesRail'
import { Sustainable } from '@/components/home/Sustainable'
import { WhatWeDo } from '@/components/home/WhatWeDo'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionNav />
      <WhatWeDo />
      <ProjectPrompt className="shell pb-16" />
      <ServicesRail />
      <Sustainable />
      <Infrastructure />
      <FindUs />
    </>
  )
}
