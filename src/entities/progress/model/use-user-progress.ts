import { useQuery } from '@tanstack/react-query'

import { useUser } from '@/features/auth/model/selectors'
import { getDailyProgressQueryOptions, getProgressQueryOptions } from '@/entities/progress/api'

const DAILY_DAYS = 30
const FALLBACK_TIMEZONE = 'UTC'

/** Resolve the user's time zone from the browser environment. */
export const getUserTimezone = (): string => {
  if (typeof window === 'undefined' || typeof Intl === 'undefined') {
    return FALLBACK_TIMEZONE
  }
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return FALLBACK_TIMEZONE
  }
}

export const useUserProgress = () => {
  const user = useUser()
  return useQuery({
    ...getProgressQueryOptions(user?.id ?? ''),
    enabled: Boolean(user?.id),
  })
}

export const useUserDailyProgress = () => {
  const user = useUser()
  return useQuery({
    ...getDailyProgressQueryOptions(user?.id ?? '', DAILY_DAYS, getUserTimezone()),
    enabled: Boolean(user?.id),
  })
}

export { DAILY_DAYS, FALLBACK_TIMEZONE }
