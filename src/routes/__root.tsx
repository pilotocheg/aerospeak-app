/* eslint-disable react-refresh/only-export-components */

import { Link, Outlet, createRootRouteWithContext, redirect, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { DashboardHeader } from '@/widgets/dashboard/dashboard-header'
import { useAuthStore } from '@/features/auth/model/auth-store'

type RootRouteContext = {
  authStore: typeof useAuthStore
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  beforeLoad: ({ location }) => {
    const isPublicRoute = location.pathname === '/login' || location.pathname === '/register'
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated && !isPublicRoute) {
      throw redirect({ to: '/login' })
    }

    if (isAuthenticated && isPublicRoute) {
      throw redirect({ to: '/' })
    }
  },
})

function RootComponent() {
  const location = useLocation()
  const isPublicRoute = location.pathname === '/login' || location.pathname === '/register'
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

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