import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const QueryProvider = ({ client, children }: PropsWithChildren<{ client: QueryClient }>) => (
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
