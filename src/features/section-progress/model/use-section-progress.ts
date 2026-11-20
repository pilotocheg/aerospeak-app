import { useQuery } from '@tanstack/react-query'

import { useAllProgress } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'
import { getSection } from '@/entities/section'
import { roundedAverage } from '@/shared/lib/rounded-average'

export type SectionProgress = {
  total: number
  practiced: number
  /** practiced / total in percent (0 for an empty section). */
  completionPercent: number
  /** Mean best score over practiced scenarios, null before the first one. */
  averageBest: number | null
  /** True until packs are loaded (from the network or the persisted cache). */
  isPending: boolean
}

const summarize = (
  scenarioIds: string[],
  progress: ReturnType<typeof useAllProgress>,
): Omit<SectionProgress, 'isPending'> => {
  const best = scenarioIds.map((id) => progress[id]?.bestScore).filter((score) => score !== undefined)
  return {
    total: scenarioIds.length,
    practiced: best.length,
    completionPercent: scenarioIds.length ? (best.length / scenarioIds.length) * 100 : 0,
    averageBest: roundedAverage(best),
  }
}

/** Progress of one section, or of all sections when sectionId is omitted. */
export const useSectionProgress = (sectionId?: string): SectionProgress => {
  const { data: packs = [], isPending } = useQuery(packsQueryOptions())
  const progress = useAllProgress()
  const packIds = sectionId ? (getSection(sectionId)?.packIds ?? []) : packs.map((pack) => pack.id)
  const scenarioIds = packs
    .filter((pack) => packIds.includes(pack.id))
    .flatMap((pack) => pack.scenarios.map((scenario) => scenario.id))
  return { ...summarize(scenarioIds, progress), isPending }
}
