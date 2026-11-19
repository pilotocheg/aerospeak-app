import type { AttemptResultDto, ScenarioStepDto } from '@/shared/api'

export type AtcTransmission = {
  text?: string
  audio?: string
  /** ATC's "negative, I say again, …" after a readback that missed a critical element. */
  isCorrection: boolean
}

/** The ATC transmission to answer now: the correction after a wrong readback, else the step's call. */
export const getAtcTransmission = (
  step: ScenarioStepDto,
  lastResult: Pick<AttemptResultDto, 'missedCritical'> | undefined,
): AtcTransmission =>
  step.atcCorrection && step.atcCorrectionAudio && lastResult?.missedCritical.length
    ? { text: step.atcCorrection, audio: step.atcCorrectionAudio, isCorrection: true }
    : { text: step.atcText, audio: step.atcAudio, isCorrection: false }
