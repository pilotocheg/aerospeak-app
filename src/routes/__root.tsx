import { createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { RootLayout } from '@/app/layouts/root-layout'
import type { useAuthStore } from '@/features/auth/model/auth-store'

type RootRouteContext = {
  authStore: typeof useAuthStore
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootLayout,
})
