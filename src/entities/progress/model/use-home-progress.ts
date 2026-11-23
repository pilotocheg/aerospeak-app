import type { PracticePackDto } from '@/shared/api'
import { findSectionByPackId } from '@/entities/section'

import { computeLocalPracticedStats } from '../lib/compute-local-practiced-stats'
import { findNextScenario } from '../lib/find-next-scenario'
import { useAllProgress } from './selectors'

/**
 * Home-page progress: practiced/total, average best score, the next unpracticed scenario and its section.
 * Only packs placed in a section count, so the next scenario always has a section to open.
 */
export const useHomeProgress = (packs: PracticePackDto[], packsIsPending: boolean) => {
  const progress = useAllProgress()
  const sectionPacks = packs.filter((pack) => findSectionByPackId(pack.id))
  const scenarioIds = sectionPacks.flatMap(({ scenarios }) => scenarios.map(({ id }) => id))
  const { practiced, total, practicedScenarioIds, averageBest } = computeLocalPracticedStats(progress, scenarioIds)
  const nextScenario = findNextScenario(sectionPacks, practicedScenarioIds)
  const section = nextScenario ? findSectionByPackId(nextScenario.packId) : undefined

  return {
    practiced,
    total,
    averageBest,
    nextScenario,
    section,
    isPending: packsIsPending,
  }
}
