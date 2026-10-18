import { createRouter } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth/model/auth-store'
import { routeTree } from '@/routeTree.gen'

export const createAppRouter = (queryClient: QueryClient) =>
  createRouter({
    routeTree,
    context: {
      queryClient,
      authStore: useAuthStore,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  })

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
