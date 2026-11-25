import type { PracticePackDto } from '@/shared/api'
import { findSectionByPackId } from '@/entities/section'

import { findNextScenario } from '../lib/find-next-scenario'
import { usePracticedStats } from './use-practiced-stats'

/**
 * Home-page progress: practiced/total, average best score, the next unpracticed scenario and its section.
 * Only packs placed in a section count, so the next scenario always has a section to open.
 */
export const useHomeProgress = (uid: string, packs: PracticePackDto[], packsIsPending: boolean) => {
  const sectionPacks = packs.filter((pack) => findSectionByPackId(pack.id))
  const scenarioIds = sectionPacks.flatMap(({ scenarios }) => scenarios.map(({ id }) => id))
  const { practiced, total, practicedScenarioIds, averageBest, isPending, isError, refetch } = usePracticedStats(
    uid,
    scenarioIds,
  )
  const nextScenario = findNextScenario(sectionPacks, practicedScenarioIds)
  const section = nextScenario ? findSectionByPackId(nextScenario.packId) : undefined

  const retry = () => {
    void refetch()
  }

  return {
    practiced,
    total,
    averageBest,
    nextScenario,
    section,
    isPending: packsIsPending || isPending,
    isError,
    retry,
  }
}
