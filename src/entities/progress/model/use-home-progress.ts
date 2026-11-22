import type { PracticePackDto } from '@/shared/api'
import { useUserProgress } from '@/entities/progress'
import { computePracticedStats, findNextScenario } from '@/entities/progress/lib/home-progress'

/** Derives home-page progress data: practiced/total stats and the next unpracticed scenario. */
export const useHomeProgress = (packs: PracticePackDto[], packsIsPending: boolean) => {
  const progressQuery = useUserProgress()
  const progress = progressQuery.data

  const { practiced, total, practicedScenarioIds } = computePracticedStats(progress)
  const nextScenario = findNextScenario(packs, practicedScenarioIds)

  return {
    practiced,
    total,
    practicedScenarioIds,
    nextScenario,
    isPending: progressQuery.isPending || packsIsPending,
  }
}
