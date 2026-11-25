import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { progressKeys } from '@/entities/progress'
import { useAuthSession } from '@/features/auth'
import { TooltipProvider } from '@/shared/ui/tooltip'

import { ThemeProvider } from './providers/theme-provider'
import { QueryProvider } from './providers/query-provider'
import { createAppRouter } from './providers/router'

const queryClient = new QueryClient()
const router = createAppRouter(queryClient)

// Progress is persisted in this browser: drop it on any sign-out so the next person here never loads it.
const clearAccountProgress = () => queryClient.removeQueries({ queryKey: progressKeys.all })

export const App = () => {
  useAuthSession({ onSignOut: clearAccountProgress })

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
