import { useQuery } from '@tanstack/react-query'

import { useAllProgress } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'
import { getSection } from '@/entities/section'
import { roundedAverage } from '@/shared/lib/math'

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
  const bestScores = scenarioIds.map((id) => progress[id]?.bestScore)
  const practicedBestScores = bestScores.filter((score) => score !== undefined)
  const total = scenarioIds.length
  const practiced = practicedBestScores.length

  return {
    total,
    practiced,
    completionPercent: total ? (practiced / total) * 100 : 0,
    averageBest: roundedAverage(practicedBestScores),
  }
}

/** Progress of one section, or of all sections when sectionId is omitted. */
export const useSectionProgress = (sectionId?: string): SectionProgress => {
  const { data: packs = [], isPending } = useQuery(packsQueryOptions())
  const progress = useAllProgress()
  const section = sectionId ? getSection(sectionId) : undefined
  const allPackIds = packs.map((pack) => pack.id)
  const packIds = sectionId ? (section?.packIds ?? []) : allPackIds
  const sectionPacks = packs.filter((pack) => packIds.includes(pack.id))
  const scenarioIds = sectionPacks.flatMap(({ scenarios }) => scenarios.map((scenario) => scenario.id))
  const summary = summarize(scenarioIds, progress)

  return { ...summary, isPending }
}
