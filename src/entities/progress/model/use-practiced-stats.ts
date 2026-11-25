import { computePracticedStats } from '../lib/compute-practiced-stats'
import { useUserProgress } from './use-user-progress'

/** Account progress over the given scenarios: practiced/total and the average best score. */
export const usePracticedStats = (uid: string, scenarioIds: string[]) => {
  const { data, isPending, isError, refetch } = useUserProgress(uid)
  const scenarioProgress = data?.scenarios ?? []
  const stats = computePracticedStats(scenarioProgress, scenarioIds)
  // A failed background refetch keeps the last (possibly persisted) progress: show that instead of an error.
  const hasNoProgress = isError && !data

  return { ...stats, isPending, isError: hasNoProgress, refetch }
}
