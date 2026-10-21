import type { PropsWithChildren } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { SCENARIO_CACHE_MS, scenarioKeys } from '@/entities/scenario'

// Packs and scenarios survive reloads, so lessons render at once while the backend wakes up;
// stale entries are refetched in the background. Bump BUSTER when the cached DTO shape changes.
const BUSTER = 'scenarios-v1'

const persister = createSyncStoragePersister({
  storage: typeof window === 'undefined' ? undefined : window.localStorage,
  key: 'aerospeak.query-cache',
})

export const QueryProvider = ({ client, children }: PropsWithChildren<{ client: QueryClient }>) => (
  <PersistQueryClientProvider
    client={client}
    persistOptions={{
      persister,
      maxAge: SCENARIO_CACHE_MS,
      buster: BUSTER,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) =>
          query.state.status === 'success' && query.queryKey[0] === scenarioKeys.all[0],
      },
    }}
  >
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </PersistQueryClientProvider>
)
