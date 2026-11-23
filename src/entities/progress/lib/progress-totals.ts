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
