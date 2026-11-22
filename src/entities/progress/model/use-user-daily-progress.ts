import { useQuery } from '@tanstack/react-query'

import { getDailyProgressQueryOptions } from '@/entities/progress/api'
import { getUserTimezone } from './get-user-timezone'

const DAILY_DAYS = 30

export const useUserDailyProgress = (uid: string) => {
  return useQuery({
    ...getDailyProgressQueryOptions(uid, DAILY_DAYS, getUserTimezone()),
    enabled: Boolean(uid),
  })
}
