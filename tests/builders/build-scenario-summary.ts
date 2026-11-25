import type { ScenarioSummaryDto } from '@/shared/api'

/** A one-step scenario summary as listed in a pack, unless overridden. */
export const buildScenarioSummary = (overrides: Partial<ScenarioSummaryDto> = {}): ScenarioSummaryDto => ({
  id: 'landing',
  title: 'Landing clearance',
  packId: 'landing-controlled',
  difficulty: 'easy',
  estimatedDurationSec: 60,
  objective: 'Read back a landing clearance.',
  stepCount: 1,
  variantCount: 1,
  ...overrides,
})
