import type { ScenarioProgressDto } from '@/shared/api'
import { roundedAverage } from '@/shared/lib/math'

import type { PracticedStats } from './practiced-stats'

/**
 * Practiced/total counts and the average best score over the given scenarios.
 * A scenario counts once it has a completed run. Progress of scenarios that are not in the list
 * (removed or renamed in the backend) is ignored.
 */
export const computePracticedStats = (
  scenarioProgress: ScenarioProgressDto[],
  scenarioIds: string[],
): PracticedStats => {
  const listedIds = new Set(scenarioIds)
  const practicedProgress = scenarioProgress.filter(({ scenarioId, runs }) => listedIds.has(scenarioId) && runs > 0)
  const practicedIds = practicedProgress.map(({ scenarioId }) => scenarioId)
  const bestScores = practicedProgress.flatMap(({ bestScore }) => (bestScore === null ? [] : [bestScore]))

  return {
    practiced: practicedIds.length,
    total: scenarioIds.length,
    practicedScenarioIds: new Set(practicedIds),
    averageBest: roundedAverage(bestScores),
  }
}
