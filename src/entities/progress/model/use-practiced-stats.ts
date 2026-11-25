import { computePracticedStats } from '../lib/compute-practiced-stats'
import { isProgressUnavailable } from '../lib/is-progress-unavailable'
import { useUserProgress } from './use-user-progress'

/** Account progress over the given scenarios: practiced/total and the average best score. */
export const usePracticedStats = (uid: string, scenarioIds: string[]) => {
  const { data, isPending, isError, refetch } = useUserProgress(uid)
  const scenarioProgress = data?.scenarios ?? []
  const stats = computePracticedStats(scenarioProgress, scenarioIds)
  const isUnavailable = isProgressUnavailable(isError, data !== undefined)

  return { ...stats, isPending, isError: isUnavailable, refetch }
}
