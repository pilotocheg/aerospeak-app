import type { AttemptResultDto } from '@/shared/api'

/** A scored attempt with no misses and the order correct, unless overridden. */
export const buildAttemptResult = (overrides: Partial<AttemptResultDto> = {}): AttemptResultDto => ({
  attemptId: 'attempt-1',
  transcript: 'runway 28 cleared to land SP-TFA',
  expectedPilotResponse: 'Runway 28, cleared to land, SP-TFA.',
  score: 100,
  displayScore: 6,
  success: true,
  elements: [],
  missedCritical: [],
  orderCorrect: true,
  tip: 'Good readback.',
  feedbackProcessingMs: 1200,
  ...overrides,
})
