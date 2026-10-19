import { useQuery } from '@tanstack/react-query'

import { useAllProgress } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'
import { getSection } from '@/entities/section'

export type SectionProgress = {
  total: number
  practiced: number
  /** Mean best score over practiced scenarios, null before the first one. */
  averageBest: number | null
}

const summarize = (scenarioIds: string[], progress: ReturnType<typeof useAllProgress>): SectionProgress => {
  const best = scenarioIds.map((id) => progress[id]?.bestScore).filter((score) => score !== undefined)
  return {
    total: scenarioIds.length,
    practiced: best.length,
    averageBest: best.length ? Math.round(best.reduce((sum, score) => sum + score, 0) / best.length) : null,
  }
}

/** Progress of one section, or of all sections when sectionId is omitted. */
export const useSectionProgress = (sectionId?: string): SectionProgress => {
  const { data: packs = [] } = useQuery(packsQueryOptions())
  const progress = useAllProgress()
  const packIds = sectionId ? (getSection(sectionId)?.packIds ?? []) : packs.map((pack) => pack.id)
  const scenarioIds = packs
    .filter((pack) => packIds.includes(pack.id))
    .flatMap((pack) => pack.scenarios.map((scenario) => scenario.id))
  return summarize(scenarioIds, progress)
}
