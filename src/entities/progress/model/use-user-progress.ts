import { useCallback, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useUser } from '@/features/auth/model/selectors'
import {
  computeAverageScore,
  computeLatestUpdate,
  computePracticeRate,
  EMPTY_TOTALS,
  type DailyProgressItem,
  type ProgressTotals,
} from '@/entities/progress/lib/daily-progress'
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

type ProgressSummary = {
  totals: ProgressTotals
  items: DailyProgressItem[]
  avgScore: number
  practiceRate: number
  latestUpdate: number
  isPending: boolean
  isError: boolean
  refetch: () => void
}

/** Derives display-ready statistics from the two progress queries. */
export const useUserProgressSummary = (): ProgressSummary => {
  const progressQuery = useUserProgress()
  const dailyQuery = useUserDailyProgress()

  const errorToasted = useRef(false)

  useEffect(() => {
    const hasError = progressQuery.isError || dailyQuery.isError
    if (hasError && !errorToasted.current) {
      errorToasted.current = true
      toast.error('Could not load statistics')
    }
    if (!hasError) {
      errorToasted.current = false
    }
  }, [progressQuery.isError, dailyQuery.isError])

  const isPending = progressQuery.isPending || dailyQuery.isPending
  const isError = progressQuery.isError || dailyQuery.isError

  const refetch = useCallback(() => {
    progressQuery.refetch()
    dailyQuery.refetch()
    errorToasted.current = false
  }, [progressQuery, dailyQuery])

  const progress = progressQuery.data
  const items = dailyQuery.data ?? []
  const totals = (progress?.totals ?? EMPTY_TOTALS) as ProgressTotals
  const avgScore = computeAverageScore(items)
  const practiceRate = computePracticeRate(totals)
  const latestUpdate = computeLatestUpdate(progressQuery.dataUpdatedAt ?? 0, dailyQuery.dataUpdatedAt ?? 0)

  return {
    totals,
    items,
    avgScore,
    practiceRate,
    latestUpdate,
    isPending,
    isError,
    refetch,
  }
}

export { DAILY_DAYS, FALLBACK_TIMEZONE }
