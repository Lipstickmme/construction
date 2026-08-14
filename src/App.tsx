import { Suspense, lazy } from 'react'
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

// The dashboard is staff-only and pulls in the whole admin surface, so it is
// split out of the bundle every visitor downloads.
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'))
const AdminChat = lazy(() => import('@/pages/admin/AdminChat'))
const AdminEnquiries = lazy(() =>
  import('@/pages/admin/AdminInbox').then((module) => ({
    default: module.AdminEnquiries,
  })),
)
const AdminApplications = lazy(() =>
  import('@/pages/admin/AdminInbox').then((module) => ({
    default: module.AdminApplications,
  })),
)

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

      <Route
        path="admin"
        element={
          <Suspense
            fallback={
              <div className="grid min-h-screen place-items-center bg-black">
                <p className="index-num text-concrete uppercase">Loading…</p>
              </div>
            }
          >
            <AdminLayout />
          </Suspense>
        }
      >
        <Route index element={<AdminEnquiries />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="chat" element={<AdminChat />} />
      </Route>
    </Routes>
  )
}
