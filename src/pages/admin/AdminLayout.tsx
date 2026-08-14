import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { isBackendConfigured, supabase } from '@/lib/supabase'
import { AdminLogin } from './AdminLogin'

const tabs = [
  { to: '/admin', label: 'Enquiries', end: true },
  { to: '/admin/applications', label: 'Applications', end: false },
  { to: '/admin/chat', label: 'Chat', end: false },
]

/** Auth gate and chrome for everything under `/admin`. */
export default function AdminLayout() {
  const { user, isAdmin, loading } = useAdminAuth()

  if (!isBackendConfigured) {
    return (
      <div className="grid min-h-screen place-items-center bg-black px-6 text-center">
        <div className="max-w-md">
          <Logo variant="light" />
          <h1 className="mt-8 font-display text-2xl font-bold text-white">
            Backend not configured
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-concrete">
            Set <code className="text-white">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-white">VITE_SUPABASE_ANON_KEY</code>, then
            reload. See <code className="text-white">SETUP.md</code>.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-black">
        <p className="index-num text-concrete uppercase">Loading…</p>
      </div>
    )
  }

  if (!user) return <AdminLogin />

  if (!isAdmin) {
    return (
      <AdminLogin notice="That account is not on the admin list. Add its user id to the admins table, or sign in with a different account." />
    )
  }

  return (
    <div className="min-h-screen bg-fog">
      <header className="bg-black">
        <div className="shell flex flex-wrap items-center justify-between gap-6 py-5">
          <Logo variant="light" />

          <div className="flex items-center gap-6">
            <span className="hidden text-xs text-concrete sm:block">
              {user.email}
            </span>
            <button
              type="button"
              onClick={() => supabase?.auth.signOut()}
              className="index-num text-concrete uppercase transition-colors hover:text-orange"
            >
              Sign out
            </button>
          </div>
        </div>

        <nav className="shell flex gap-8 border-t border-white/10">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `border-b-2 py-4 font-display text-sm font-semibold tracking-widest uppercase transition-colors ${
                  isActive
                    ? 'border-orange text-white'
                    : 'border-transparent text-concrete hover:text-white'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="shell py-10">
        <Outlet />
      </main>
    </div>
  )
}
