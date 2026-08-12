import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import About from '@/pages/About'
import Careers from '@/pages/Careers'
import Contact from '@/pages/Contact'
import CorporateResponsibility from '@/pages/CorporateResponsibility'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ResponsibilityPage from '@/pages/responsibility/ResponsibilityPage'
import Services from '@/pages/Services'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="corporate-responsibility">
          <Route index element={<CorporateResponsibility />} />
          <Route path=":slug" element={<ResponsibilityPage />} />
        </Route>
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
