import type { ProgressTotals } from './progress-totals'

/** Share of practiced scenarios out of total, rounded to percent. 0 when nothing assigned. */
export const computePracticeRate = (totals: ProgressTotals): number => {
  if (totals.totalScenarios === 0) {
    return 0
  }
  return Math.round((totals.practicedScenarios / totals.totalScenarios) * 100)
}
