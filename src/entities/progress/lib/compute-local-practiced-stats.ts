import { roundedAverage } from '@/shared/lib/math'

import type { ScenarioProgress } from '../model/progress-store'
import type { PracticedStats } from './practiced-stats'

/**
 * Practiced/total counts and the average best score over the given scenarios.
 * Progress of scenarios that are not in the list (removed or renamed in the backend) is ignored.
 */
export const computeLocalPracticedStats = (
  progress: Record<string, ScenarioProgress>,
  scenarioIds: string[],
): PracticedStats => {
  const practicedIds = scenarioIds.filter((id) => (progress[id]?.attempts ?? 0) > 0)
  const bestScores = practicedIds.map((id) => progress[id].bestScore)

  return {
    practiced: practicedIds.length,
    total: scenarioIds.length,
    practicedScenarioIds: new Set(practicedIds),
    averageBest: roundedAverage(bestScores),
  }
}
