import { useMemo, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { QueryProvider } from './providers/query-provider'
import { AppRouterProvider, createAppRouter } from './providers/router-provider'

export function App() {
  const [queryClient] = useState(() => new QueryClient())
  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return (
    <QueryProvider client={queryClient}>
      <AppRouterProvider router={router} />
    </QueryProvider>
  )
}
