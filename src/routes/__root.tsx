import { createRootRouteWithContext, redirect } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { RootLayout } from '@/app/layouts/root-layout'
import { useAuthStore } from '@/features/auth/model/auth-store'

type RootRouteContext = {
  authStore: typeof useAuthStore
  queryClient: QueryClient
}

const PUBLIC_ROUTES = ['/login', '/register']

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootLayout,
  beforeLoad: ({ location }) => {
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname)
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated && !isPublicRoute) {
      throw redirect({ to: '/login' })
    }

    if (isAuthenticated && isPublicRoute) {
      throw redirect({ to: '/' })
    }
  },
})
