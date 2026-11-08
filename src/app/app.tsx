import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { useAuthSession } from '@/features/auth/lib/use-auth-session'

import { ThemeProvider } from './providers/theme-provider'
import { QueryProvider } from './providers/query-provider'
import { createAppRouter } from './providers/router'

const queryClient = new QueryClient()
const router = createAppRouter(queryClient)

export const App = () => {
  useAuthSession()

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  )
}
