import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { progressKeys } from './progress-keys'

export const getProgress = async () => {
  const { data, error } = await apiClient.GET('/me/progress')
  if (error || !data) {
    throw new Error('Could not load progress')
  }
  return data
}

export const getProgressQueryOptions = (uid: string) =>
  queryOptions({
    queryKey: progressKeys.detail(uid),
    queryFn: getProgress,
    staleTime: 60_000,
  })
