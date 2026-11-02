import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { useAuthSession } from '@/features/auth/lib/use-auth-session'

import { QueryProvider } from './providers/query-provider'
import { createAppRouter } from './providers/router'

const queryClient = new QueryClient()
const router = createAppRouter(queryClient)

export const App = () => {
  useAuthSession()

  return (
    <QueryProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
