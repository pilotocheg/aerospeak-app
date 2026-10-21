import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { scenarioKeys } from './scenario-keys'

/** Packs and scenarios are persisted to localStorage (see app QueryProvider) and kept this long. */
export const SCENARIO_CACHE_MS = 7 * 24 * 60 * 60 * 1000

export class ScenarioNotFoundError extends Error {
  constructor(id: string) {
    super(`Scenario "${id}" not found`)
    this.name = 'ScenarioNotFoundError'
  }
}

const fetchPacks = async () => {
  const { data, error } = await apiClient.GET('/packs')
  if (error) {
    throw new Error('Could not load practice packs')
  }
  return data
}

const fetchScenario = async (id: string) => {
  const { data, response } = await apiClient.GET('/scenarios/{id}', { params: { path: { id } } })
  if (response.status === 404) {
    throw new ScenarioNotFoundError(id)
  }
  if (!data) {
    throw new Error('Could not load the scenario')
  }
  return data
}

export const packsQueryOptions = () =>
  queryOptions({
    queryKey: scenarioKeys.packs(),
    queryFn: fetchPacks,
    staleTime: 5 * 60 * 1000,
    gcTime: SCENARIO_CACHE_MS,
  })

export const scenarioQueryOptions = (id: string) =>
  queryOptions({
    queryKey: scenarioKeys.detail(id),
    queryFn: () => fetchScenario(id),
    staleTime: 5 * 60 * 1000,
    gcTime: SCENARIO_CACHE_MS,
    retry: (count, error) => !(error instanceof ScenarioNotFoundError) && count < 2,
  })
