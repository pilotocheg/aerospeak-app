/**
 * Scenario content now lives in the backend repo. Scripts read it through the API:
 * VITE_API_URL from the environment or .env, production by default. To try content
 * that is not deployed yet, run the backend locally and set VITE_API_URL=http://localhost:3000.
 */
import { join } from 'node:path'

import type { PracticePackDto, ScenarioDto } from '../src/shared/api/types.ts'

export const ROOT = join(import.meta.dirname, '..')
export const PUBLIC_DIR = join(ROOT, 'public')

try {
  // Values already in the environment win over .env.
  process.loadEnvFile(join(ROOT, '.env'))
} catch {
  // No .env: use the environment or the default.
}

export const API_URL = (process.env.VITE_API_URL ?? 'https://aerospeak-be.onrender.com').replace(/\/$/, '')

const fetchJson = async <T>(path: string): Promise<T> => {
  // Render's free plan sleeps: the first request can take up to a minute.
  const response = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(90_000) })
  if (!response.ok) {
    throw new Error(`GET ${API_URL}${path} failed: ${response.status}`)
  }
  return (await response.json()) as T
}

export const fetchContent = async () => {
  const packs = await fetchJson<PracticePackDto[]>('/packs')
  const scenarios = await Promise.all(
    packs.flatMap((pack) => pack.scenarios).map((summary) => fetchJson<ScenarioDto>(`/scenarios/${summary.id}`)),
  )
  return { packs, scenarios }
}
