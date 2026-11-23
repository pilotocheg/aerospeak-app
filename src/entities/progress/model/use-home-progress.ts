import type { PracticePackDto } from '@/shared/api'
import { useAllProgress } from '@/entities/progress'
import { computeLocalPracticedStats, findNextScenario } from '@/entities/progress/lib'
import { findSectionByPackId } from '@/entities/section'

/** Derives home-page progress data: practiced/total stats, next unpracticed scenario and its section. */
export const useHomeProgress = (packs: PracticePackDto[], packsIsPending: boolean) => {
  const progress = useAllProgress()
  const totalScenarios = packs.reduce((sum, pack) => sum + pack.scenarios.length, 0)
  const { practiced, total, practicedScenarioIds } = computeLocalPracticedStats(progress, totalScenarios)
  const nextScenario = findNextScenario(packs, practicedScenarioIds)
  const section = nextScenario ? findSectionByPackId(nextScenario.packId) : undefined

  return {
    practiced,
    total,
    practicedScenarioIds,
    nextScenario,
    section,
    isPending: packsIsPending,
  }
}
