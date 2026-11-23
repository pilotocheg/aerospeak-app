export type PracticedStats = {
  practiced: number
  total: number
  practicedScenarioIds: Set<string>
  /** Mean best score over practiced scenarios, null before the first one. */
  averageBest: number | null
}
