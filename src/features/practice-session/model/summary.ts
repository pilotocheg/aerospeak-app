import { isMissedCritical } from '@/entities/attempt'
import type { ScenarioDto } from '@/shared/api'
import { average } from '@/shared/lib/math'

import type { StepAttempt } from './practice-store'

export type PracticeSummary = {
  /** Mean of the best score per step; steps without attempts count as 0. */
  scenarioScore: number
  phrasesRecorded: number
  successfulPhrases: number
  bestPhraseScore: number
  missedCritical: string[]
  /** Mean (best - first) over steps with retries; null without retries. */
  retryImprovement: number | null
}

export const buildSummary = (scenario: ScenarioDto, attemptsByStep: Record<string, StepAttempt[]>): PracticeSummary => {
  const perStep = scenario.steps.map((step) => attemptsByStep[step.id] ?? [])
  const all = perStep.flat()
  const best = perStep.map((attempts) => Math.max(0, ...attempts.map((a) => a.result.score)))
  const retried = perStep.filter((attempts) => attempts.length > 1)

  const lastAttempts = perStep.map((attempts) => attempts.at(-1)).filter((a) => a !== undefined)
  const missedCritical = [
    ...new Set(lastAttempts.flatMap((attempt) => attempt.result.elements.filter(isMissedCritical).map((e) => e.label))),
  ]

  return {
    scenarioScore: Math.round(average(best)),
    phrasesRecorded: all.length,
    successfulPhrases: all.filter((a) => a.result.success).length,
    bestPhraseScore: Math.max(0, ...all.map((a) => a.result.score)),
    missedCritical,
    retryImprovement: retried.length
      ? Math.round(
          average(
            retried.map((attempts) => Math.max(...attempts.map((a) => a.result.score)) - attempts[0].result.score),
          ),
        )
      : null,
  }
}
