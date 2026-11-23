import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { useAuthSession } from '@/features/auth'
import { TooltipProvider } from '@/shared/ui/tooltip'

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
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
