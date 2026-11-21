import { describe, expect, it } from 'vitest'

import { buildScenarioStep } from '@/shared/testing'

import { getAtcTransmission } from './get-atc-transmission'

const CORRECTION = 'SP-TFA, negative, I say again, runway 28, cleared to land.'
const CORRECTION_AUDIO = '/audio/atc/landing-correction.mp3'

const stepWithCorrection = buildScenarioStep({ atcCorrection: CORRECTION, atcCorrectionAudio: CORRECTION_AUDIO })

describe('getAtcTransmission', () => {
  it("is the step's call before any attempt", () => {
    const atc = getAtcTransmission(stepWithCorrection, undefined)

    expect(atc).toEqual({ text: stepWithCorrection.atcText, audio: stepWithCorrection.atcAudio, isCorrection: false })
  })

  it("is ATC's correction after a readback that missed a critical element", () => {
    const atc = getAtcTransmission(stepWithCorrection, { missedCritical: ['runway'] })

    expect(atc).toEqual({ text: CORRECTION, audio: CORRECTION_AUDIO, isCorrection: true })
  })

  it("goes back to the step's call after a readback without critical misses", () => {
    const atc = getAtcTransmission(stepWithCorrection, { missedCritical: [] })

    expect(atc.isCorrection).toBe(false)
  })

  it("stays the step's call when the correction has no audio", () => {
    const step = buildScenarioStep({ atcCorrection: CORRECTION })

    const atc = getAtcTransmission(step, { missedCritical: ['runway'] })

    expect(atc.isCorrection).toBe(false)
  })
})
