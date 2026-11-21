import { describe, expect, it } from 'vitest'

import { buildAttemptResult, buildElementResult, buildScenario, buildScenarioStep } from '@/shared/testing'

import type { StepAttempt } from './practice-store'
import { buildSummary } from './summary'

const STEP_A = buildScenarioStep({ id: 'a' })
const STEP_B = buildScenarioStep({ id: 'b' })
const scenario = buildScenario({ steps: [STEP_A, STEP_B] })

const attemptWithScore = (score: number, success = score >= 80): StepAttempt => ({
  result: buildAttemptResult({ score, success }),
  recordingUrl: `blob:attempt-${score}`,
})

const attemptMissing = (label: string): StepAttempt => ({
  result: buildAttemptResult({
    score: 40,
    success: false,
    elements: [buildElementResult({ id: label, label, critical: true, status: 'missed' })],
  }),
  recordingUrl: 'blob:attempt-missed',
})

describe('buildSummary', () => {
  it('scores the scenario as the mean of the best score per step', () => {
    const summary = buildSummary(scenario, {
      a: [attemptWithScore(60), attemptWithScore(90)],
      b: [attemptWithScore(70)],
    })

    expect(summary.scenarioScore).toBe(80)
  })

  it('counts a step without attempts as 0 in the scenario score', () => {
    const summary = buildSummary(scenario, { a: [attemptWithScore(90)] })

    expect(summary.scenarioScore).toBe(45)
  })

  it('counts every recorded and every successful phrase', () => {
    const summary = buildSummary(scenario, {
      a: [attemptWithScore(60), attemptWithScore(90)],
      b: [attemptWithScore(85)],
    })

    expect([summary.phrasesRecorded, summary.successfulPhrases]).toEqual([3, 2])
  })

  it('reports the best single phrase', () => {
    const summary = buildSummary(scenario, { a: [attemptWithScore(60)], b: [attemptWithScore(95)] })

    expect(summary.bestPhraseScore).toBe(95)
  })

  it('lists critical elements still missed in the last attempt of each step, once', () => {
    const summary = buildSummary(scenario, { a: [attemptMissing('runway')], b: [attemptMissing('runway')] })

    expect(summary.missedCritical).toEqual(['runway'])
  })

  it('forgets a critical miss fixed by a later attempt', () => {
    const summary = buildSummary(scenario, { a: [attemptMissing('runway'), attemptWithScore(90)] })

    expect(summary.missedCritical).toEqual([])
  })

  it('measures retry improvement as the mean of best minus first over retried steps', () => {
    const summary = buildSummary(scenario, {
      a: [attemptWithScore(50), attemptWithScore(80)],
      b: [attemptWithScore(70), attemptWithScore(60), attemptWithScore(80)],
    })

    expect(summary.retryImprovement).toBe(20)
  })

  it('has no retry improvement without retries', () => {
    const summary = buildSummary(scenario, { a: [attemptWithScore(90)], b: [attemptWithScore(70)] })

    expect(summary.retryImprovement).toBeNull()
  })

  it('is all zeros for a run without attempts', () => {
    const summary = buildSummary(scenario, {})

    expect(summary).toEqual({
      scenarioScore: 0,
      phrasesRecorded: 0,
      successfulPhrases: 0,
      bestPhraseScore: 0,
      missedCritical: [],
      retryImprovement: null,
    })
  })
})
