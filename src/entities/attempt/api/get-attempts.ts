import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { attemptKeys } from './attempt-keys'

export const listAttempts = async (limit = 20) => {
  const { data, error } = await apiClient.GET('/me/attempts', {
    params: { query: { limit } },
  })
  if (error || !data) {
    throw new Error('Could not load attempts')
  }
  return data.items
}

export const listAttemptsQueryOptions = (uid: string, limit = 20) =>
  queryOptions({
    queryKey: attemptKeys.list(uid, limit),
    queryFn: () => listAttempts(limit),
    staleTime: 60_000,
  })