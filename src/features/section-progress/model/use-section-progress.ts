import { useQuery } from '@tanstack/react-query'

import { usePracticedStats } from '@/entities/progress'
import { packsQueryOptions } from '@/entities/scenario'
import { getSection } from '@/entities/section'

export type SectionProgress = {
  total: number
  practiced: number
  /** practiced / total in percent (0 for an empty section). */
  completionPercent: number
  /** Mean best score over practiced scenarios, null before the first one. */
  averageBest: number | null
  /** True until packs (network or persisted cache) and the account progress are loaded. */
  isPending: boolean
  /** The account progress could not be loaded. */
  isError: boolean
}

/** The account's progress in one section, or in all sections when sectionId is omitted. */
export const useSectionProgress = (uid: string, sectionId?: string): SectionProgress => {
  const { data: packs = [], isPending: packsIsPending } = useQuery(packsQueryOptions())
  const section = sectionId ? getSection(sectionId) : undefined
  const allPackIds = packs.map((pack) => pack.id)
  const packIds = sectionId ? (section?.packIds ?? []) : allPackIds
  const sectionPacks = packs.filter((pack) => packIds.includes(pack.id))
  const scenarioIds = sectionPacks.flatMap(({ scenarios }) => scenarios.map((scenario) => scenario.id))
  const { practiced, total, averageBest, isPending, isError } = usePracticedStats(uid, scenarioIds)
  const completionPercent = total ? (practiced / total) * 100 : 0

  return {
    total,
    practiced,
    completionPercent,
    averageBest,
    isPending: packsIsPending || isPending,
    isError,
  }
}
