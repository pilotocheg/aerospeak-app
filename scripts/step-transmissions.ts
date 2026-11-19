import type { ScenarioStepDto } from '../src/shared/api/types.ts'

/**
 * ATC transmissions of a step with their audio paths: the step's call and, on readback steps,
 * ATC's "negative, I say again" correction.
 */
export const stepTransmissions = (step: ScenarioStepDto) =>
  [
    { text: step.atcText, audio: step.atcAudio },
    { text: step.atcCorrection, audio: step.atcCorrectionAudio },
  ].filter((t): t is { text: string; audio: string } => Boolean(t.text && t.audio))
