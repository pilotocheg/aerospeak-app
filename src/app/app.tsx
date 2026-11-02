import { useEffect } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { initAuthSession } from '@/features/auth/model/actions'

import { QueryProvider } from './providers/query-provider'
import { createAppRouter } from './providers/router'

const queryClient = new QueryClient()
const router = createAppRouter(queryClient)

export const App = () => {
  useEffect(() => {
    const unsubscribe = initAuthSession()
    return () => unsubscribe()
  }, [])

  return (
    <QueryProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
