import type { PropsWithChildren } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { progressKeys } from '@/entities/progress'
import { SCENARIO_CACHE_MS, scenarioKeys } from '@/entities/scenario'

// Packs, scenarios and the account progress (keyed by uid) survive reloads, so lessons and progress
// render at once while the backend wakes up; stale entries are refetched in the background.
// Bump BUSTER when a cached DTO shape changes.
const BUSTER = 'scenarios-v1'

const PERSISTED_ROOT_KEYS = new Set<unknown>([scenarioKeys.all[0], progressKeys.all[0]])

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
        shouldDehydrateQuery: ({ state, queryKey }) =>
          state.status === 'success' && PERSISTED_ROOT_KEYS.has(queryKey[0]),
      },
    }}
  >
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </PersistQueryClientProvider>
)
