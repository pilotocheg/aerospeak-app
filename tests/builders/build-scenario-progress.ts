import type { ScenarioProgressDto } from '@/shared/api'

/** Account progress of a scenario with one completed run scored 80, unless overridden. */
export const buildScenarioProgress = (overrides: Partial<ScenarioProgressDto> = {}): ScenarioProgressDto => ({
  scenarioId: 'landing',
  packId: 'landing-controlled',
  runs: 1,
  bestScore: 80,
  lastScore: 80,
  scores: [80],
  lastPlayedAt: '2026-11-23T10:00:00.000Z',
  stepAttempts: 2,
  ...overrides,
})
