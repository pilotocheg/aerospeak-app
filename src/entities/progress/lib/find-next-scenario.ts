import type { PracticePackDto } from '@/shared/api'

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
