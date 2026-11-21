import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { scenarioCacheTimes } from './scenario-cache'
import { scenarioKeys } from './scenario-keys'
import { ScenarioNotFoundError } from './scenario-not-found-error'

const fetchScenario = async (id: string, variant?: string) => {
  const { data, response } = await apiClient.GET('/scenarios/{id}', {
    params: { path: { id }, query: variant ? { variant } : {} },
  })
  if (response.status === 404) {
    throw new ScenarioNotFoundError(id)
  }
  if (!data) {
    throw new Error('Could not load the scenario')
  }
  return data
}

/**
 * A scenario rendered for one variant (aerodrome, weather, aircraft). Without `variant`: the
 * default variant; its `variants` lists every key to pick from.
 */
export const scenarioQueryOptions = (id: string, variant?: string) => {
  const variantKey = variant || undefined
  return queryOptions({
    queryKey: scenarioKeys.detail(id, variantKey),
    queryFn: () => fetchScenario(id, variantKey),
    ...scenarioCacheTimes,
    retry: (count, error) => !(error instanceof ScenarioNotFoundError) && count < 2,
  })
}
