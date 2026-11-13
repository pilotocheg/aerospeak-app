import { queryOptions } from '@tanstack/react-query'

import { apiClient } from '@/shared/api'

import { progressKeys } from './progress-keys'

export const getDailyProgress = async (days: number, tz: string) => {
  const { data, error } = await apiClient.GET('/me/progress/daily', {
    params: { query: { days, tz } },
  })
  if (error || !data) {
    throw new Error('Could not load daily progress')
  }
  return data
}

export const getDailyProgressQueryOptions = (uid: string, days: number, tz: string) =>
  queryOptions({
    queryKey: progressKeys.daily(uid, days, tz),
    queryFn: () => getDailyProgress(days, tz),
    staleTime: 60_000,
  })
