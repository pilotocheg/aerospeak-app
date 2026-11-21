import type { ScenarioDto } from '@/shared/api'

import { buildScenarioStep } from './build-scenario-step'

/** A one-step scenario in its default variant, unless overridden. */
export const buildScenario = (overrides: Partial<ScenarioDto> = {}): ScenarioDto => ({
  id: 'landing',
  title: 'Landing clearance',
  packId: 'landing-controlled',
  difficulty: 'easy',
  estimatedDurationSec: 60,
  objective: 'Read back a landing clearance.',
  phraseologyNote: {
    id: 'landing',
    title: 'Landing clearance',
    shortExplanation: 'Read back the runway and the clearance.',
    overview: [],
    references: [],
  },
  steps: [buildScenarioStep()],
  variant: 'EPPO.default',
  variants: ['EPPO.default'],
  ...overrides,
})
