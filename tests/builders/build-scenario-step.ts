import type { ScenarioStepDto } from '@/shared/api'

/** A readback step with an ATC call and no correction, unless overridden. */
export const buildScenarioStep = (overrides: Partial<ScenarioStepDto> = {}): ScenarioStepDto => ({
  id: 'step-1',
  type: 'atc_instruction',
  speaker: 'atc',
  prompt: 'Read back the landing clearance.',
  atcText: 'SP-TFA, runway 28, cleared to land.',
  atcAudio: '/audio/atc/landing.mp3',
  expectedPilotResponse: 'Runway 28, cleared to land, SP-TFA.',
  requiredElements: [],
  ...overrides,
})
