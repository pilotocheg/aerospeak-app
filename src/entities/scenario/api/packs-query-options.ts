import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { scenarioCacheTimes } from './scenario-cache'
import { scenarioKeys } from './scenario-keys'

const fetchPacks = async () => {
  const { data, error } = await apiClient.GET('/packs')
  if (error) {
    throw new Error('Could not load practice packs')
  }
  return data
}

export const packsQueryOptions = () =>
  queryOptions({
    queryKey: scenarioKeys.packs(),
    queryFn: fetchPacks,
    ...scenarioCacheTimes,
  })
