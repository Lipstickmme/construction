import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import About from '@/pages/About'
import Capabilities from '@/pages/Capabilities'
import CapabilityDetail from '@/pages/CapabilityDetail'
import Careers from '@/pages/Careers'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Projects from '@/pages/Projects'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="capabilities">
          <Route index element={<Capabilities />} />
          <Route path=":slug" element={<CapabilityDetail />} />
        </Route>
        <Route path="projects" element={<Projects />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
