import type { DailyProgressItem } from './daily-progress-item'

/** Weighted average score across daily items, weighted by attempts. Days with 0 attempts are skipped. 0 when nothing to average. */
export const computeAverageScore = (items: DailyProgressItem[]): number => {
  let weightedSum = 0
  let totalAttempts = 0
  for (const day of items) {
    if (day.attempts === 0) {
      continue
    }
    weightedSum += day.averageScore * day.attempts
    totalAttempts += day.attempts
  }
  if (totalAttempts === 0) {
    return 0
  }
  return Math.round(weightedSum / totalAttempts)
}
