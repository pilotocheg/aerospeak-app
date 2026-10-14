/* eslint-disable react-refresh/only-export-components */

import { RouterProvider, createRouter } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth/model/auth-store'
import { routeTree } from '@/routeTree.gen'

export function createAppRouter(queryClient: QueryClient) {
  return createRouter({
    routeTree,
    context: {
      queryClient,
      authStore: useAuthStore,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  })
}

export function AppRouterProvider({ router }: { router: ReturnType<typeof createAppRouter> }) {
  return <RouterProvider router={router} />
}
