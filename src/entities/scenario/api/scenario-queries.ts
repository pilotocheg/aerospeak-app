import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'
import { CONTENT_SOURCE } from '@/shared/config/env'
import { findLocalScenario, localPacks, type Scenario } from '@/shared/content'

import { scenarioKeys } from './scenario-keys'

export class ScenarioNotFoundError extends Error {
  constructor(id: string) {
    super(`Scenario "${id}" not found`)
    this.name = 'ScenarioNotFoundError'
  }
}

const fetchPacks = async () => {
  if (CONTENT_SOURCE === 'local') {
    return localPacks
  }

  const { data, error } = await apiClient.GET('/packs')
  if (error) {
    throw new Error('Could not load practice packs')
  }
  return data
}

const fetchScenario = async (id: string): Promise<Scenario> => {
  if (CONTENT_SOURCE === 'local') {
    const scenario = findLocalScenario(id)
    if (!scenario) {
      throw new ScenarioNotFoundError(id)
    }
    return scenario
  }

  const { data, response } = await apiClient.GET('/scenarios/{id}', { params: { path: { id } } })
  if (response.status === 404) {
    throw new ScenarioNotFoundError(id)
  }
  if (!data) {
    throw new Error('Could not load the scenario')
  }
  return data
}

/** Whether the backend knows this scenario, i.e. can score attempts for it. */
const fetchIsDeployed = async (id: string) => {
  const { response } = await apiClient.GET('/scenarios/{id}', { params: { path: { id } } })
  return response.ok
}

export const packsQueryOptions = () =>
  queryOptions({
    queryKey: scenarioKeys.packs(),
    queryFn: fetchPacks,
    staleTime: 5 * 60 * 1000,
  })

export const scenarioQueryOptions = (id: string) =>
  queryOptions({
    queryKey: scenarioKeys.detail(id),
    queryFn: () => fetchScenario(id),
    staleTime: 5 * 60 * 1000,
    retry: (count, error) => !(error instanceof ScenarioNotFoundError) && count < 2,
  })

export const scenarioDeployedQueryOptions = (id: string) =>
  queryOptions({
    queryKey: scenarioKeys.deployed(id),
    queryFn: () => fetchIsDeployed(id),
    staleTime: 10 * 60 * 1000,
  })
