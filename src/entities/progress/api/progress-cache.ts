/**
 * Progress is persisted to localStorage with the scenarios (see app QueryProvider), so home shows
 * the last known numbers while the backend wakes up. gcTime keeps it in the persisted cache
 * while no page observes it; logout removes it.
 */
export const progressCacheTimes = {
  staleTime: 60_000,
  gcTime: 24 * 60 * 60 * 1000,
}
