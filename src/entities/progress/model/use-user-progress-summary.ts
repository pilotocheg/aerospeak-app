import { useUserProgress } from './use-user-progress'
import { useUserDailyProgress } from './use-user-daily-progress'
import {
  computeAverageScore,
  computeLatestUpdate,
  computePracticeRate,
  EMPTY_TOTALS,
  type DailyProgressItem,
  type ProgressTotals,
} from '@/entities/progress/lib'

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
export const useUserProgressSummary = (uid: string): ProgressSummary => {
  const progressQuery = useUserProgress(uid)
  const dailyQuery = useUserDailyProgress(uid)

  const isPending = progressQuery.isPending || dailyQuery.isPending
  const isError = progressQuery.isError || dailyQuery.isError

  const refetch = () => {
    progressQuery.refetch()
    dailyQuery.refetch()
  }

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
