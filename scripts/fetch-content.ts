/** Reads packs and scenarios from the backend (see `config.ts` for the URL). */
import type { PracticePackDto, ScenarioDto } from '../src/shared/api/types'

import { API_URL } from './config'

const fetchJson = async <T>(path: string): Promise<T> => {
  // Render's free plan sleeps: the first request can take up to a minute.
  const response = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(90_000) })
  if (!response.ok) {
    throw new Error(`GET ${API_URL}${path} failed: ${response.status}`)
  }
  return (await response.json()) as T
}

/**
 * Packs, each scenario in its default variant, and every variant of every scenario
 * (aerodrome, weather, aircraft): one request per scenario, so the rate limit is not hit.
 */
export const fetchContent = async () => {
  const packs = await fetchJson<PracticePackDto[]>('/packs')
  const variants = (
    await Promise.all(
      packs
        .flatMap((pack) => pack.scenarios)
        .map((summary) => fetchJson<ScenarioDto[]>(`/scenarios/${summary.id}/variants`)),
    )
  ).flat()
  const scenarios = variants.filter((scenario) => scenario.variant === scenario.variants[0])
  return { packs, scenarios, variants }
}
