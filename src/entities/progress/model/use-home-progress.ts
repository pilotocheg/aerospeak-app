import type { PracticePackDto } from '@/shared/api'
import { useAllProgress } from '@/entities/progress'
import { computeLocalPracticedStats, findNextScenario } from '@/entities/progress/lib'

/** Derives home-page progress data: practiced/total stats and the next unpracticed scenario. */
export const useHomeProgress = (packs: PracticePackDto[], packsIsPending: boolean) => {
  const progress = useAllProgress()
  const totalScenarios = packs.reduce((sum, pack) => sum + pack.scenarios.length, 0)
  const { practiced, total, practicedScenarioIds } = computeLocalPracticedStats(progress, totalScenarios)
  const nextScenario = findNextScenario(packs, practicedScenarioIds)

  return {
    practiced,
    total,
    practicedScenarioIds,
    nextScenario,
    isPending: packsIsPending,
  }
}
