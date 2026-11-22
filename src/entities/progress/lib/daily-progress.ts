export type DailyProgressItem = {
  date: string
  attempts: number
  successful: number
  averageScore: number
}

export type ProgressTotals = {
  practicedScenarios: number
  totalScenarios: number
  attempts: number
  successfulPhrases: number
  successfulPhrasesLast7Days: number
}

export const EMPTY_TOTALS: ProgressTotals = {
  practicedScenarios: 0,
  totalScenarios: 0,
  attempts: 0,
  successfulPhrases: 0,
  successfulPhrasesLast7Days: 0,
}

/** Average score across daily items, rounded. 0 when there are no items. */
export const computeAverageScore = (items: DailyProgressItem[]): number => {
  if (items.length === 0) {
    return 0
  }
  const sum = items.reduce((acc, day) => acc + day.averageScore, 0)
  return Math.round(sum / items.length)
}

/** Share of practiced scenarios out of total, rounded to percent. 0 when nothing assigned. */
export const computePracticeRate = (totals: ProgressTotals): number => {
  if (totals.totalScenarios === 0) {
    return 0
  }
  return Math.round((totals.practicedScenarios / totals.totalScenarios) * 100)
}

/** Latest update timestamp across two queries. 0 when neither has data. */
export const computeLatestUpdate = (a: number, b: number): number => {
  return Math.max(a ?? 0, b ?? 0)
}
