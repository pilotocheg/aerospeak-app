import type { PracticePackDto } from '@/shared/api'

export type PracticedStats = {
  practiced: number
  total: number
  practicedScenarioIds: Set<string>
}

type ProgressData =
  | {
      totals?: { practicedScenarios: number; totalScenarios: number } | null
      scenarios?: { scenarioId: string }[] | null
    }
  | undefined

/** Compute practiced/total counts and the set of practiced scenario ids from progress data. */
export const computePracticedStats = (progress: ProgressData): PracticedStats => {
  const totals = progress?.totals
  const practiced = totals?.practicedScenarios ?? 0
  const total = totals?.totalScenarios ?? 0
  const practicedScenarioIds = new Set(progress?.scenarios?.map((s) => s.scenarioId) ?? [])
  return { practiced, total, practicedScenarioIds }
}

/** Find the first unpracticed scenario across packs ordered by `order`. */
export const findNextScenario = (
  packs: PracticePackDto[],
  practicedScenarioIds: Set<string>,
): PracticePackDto['scenarios'][number] | undefined => {
  return [...packs]
    .sort((a, b) => a.order - b.order)
    .flatMap((pack) => pack.scenarios)
    .find((scenario) => !practicedScenarioIds.has(scenario.id))
}
