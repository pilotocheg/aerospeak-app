import { useEffect } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { progressKeys } from '@/entities/progress'
import { useAuthSession } from '@/features/auth'
import { TooltipProvider } from '@/shared/ui/tooltip'

import { logPageView } from '@/shared/lib/firebase/analytics'
import { ThemeProvider } from './providers/theme-provider'
import { QueryProvider } from './providers/query-provider'
import { createAppRouter } from './providers/router'

const queryClient = new QueryClient()
const router = createAppRouter(queryClient)

// Progress is persisted in this browser: drop it on any sign-out so the next person here never loads it.
const clearAccountProgress = () => queryClient.removeQueries({ queryKey: progressKeys.all })

export const App = () => {
  useAuthSession({ onSignOut: clearAccountProgress })

  // Track page views on navigation (production only; no-op in dev / when analytics is disabled)
  useEffect(() => {
    logPageView(router.state.location.pathname)

    const unsubscribe = router.subscribe('onResolved', () => {
      logPageView(router.state.location.pathname)
    })

    return unsubscribe
  }, [])

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
