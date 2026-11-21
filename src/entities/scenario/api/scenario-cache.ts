/** Packs and scenarios are persisted to localStorage (see app QueryProvider) and kept this long. */
export const SCENARIO_CACHE_MS = 7 * 24 * 60 * 60 * 1000

/** Cache timing shared by the pack and scenario queries. */
export const scenarioCacheTimes = {
  staleTime: 5 * 60 * 1000,
  gcTime: SCENARIO_CACHE_MS,
}
