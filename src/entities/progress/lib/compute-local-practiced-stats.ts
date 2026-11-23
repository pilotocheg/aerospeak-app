import type { ScenarioProgress } from '@/entities/progress'
import type { PracticedStats } from './practiced-stats'

/** Compute practiced/total counts and practiced scenario ids from the local progress store. */
export const computeLocalPracticedStats = (
  progress: Record<string, ScenarioProgress>,
  totalScenarios: number,
): PracticedStats => {
  const practicedScenarioIds = new Set(
    Object.entries(progress)
      .filter(([, p]) => p.attempts > 0)
      .map(([id]) => id),
  )
  return {
    practiced: practicedScenarioIds.size,
    total: totalScenarios,
    practicedScenarioIds,
  }
}
