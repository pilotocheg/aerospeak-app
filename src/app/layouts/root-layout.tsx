import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { useIsAuthenticated } from '@/features/auth/model/selectors'
import { DashboardHeader } from '@/widgets/dashboard/dashboard-header'

const PUBLIC_ROUTES = ['/login', '/register']

export const RootLayout = () => {
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname)

  return (
    <>
      {!isPublicRoute && isAuthenticated ? (
        <>
          <DashboardHeader />
          <nav className="border-b border-slate-800 bg-slate-950/60">
            <div className="mx-auto flex max-w-7xl gap-6 px-6 py-3 text-sm text-slate-300">
              <Link to="/" className="transition hover:text-white" activeProps={{ className: 'font-semibold text-white' }}>
                Overview
              </Link>
              <Link to="/about" className="transition hover:text-white" activeProps={{ className: 'font-semibold text-white' }}>
                About
              </Link>
            </div>
          </nav>
        </>
      ) : null}

      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
