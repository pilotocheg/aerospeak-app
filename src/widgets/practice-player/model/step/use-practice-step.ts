import { useAttemptsByStep, useIsFinished, useStepIndex } from '@/features/practice-session'
import type { ScenarioDto } from '@/shared/api'

/** The step being practiced and its attempts in this run. */
export const usePracticeStep = (scenario: ScenarioDto) => {
  const stepIndex = useStepIndex()
  const attemptsByStep = useAttemptsByStep()
  const isFinished = useIsFinished()

  const { steps } = scenario
  const step = steps[stepIndex]
  const attempts = attemptsByStep[step.id] ?? []
  const lastAttempt = attempts.at(-1)

  return {
    step,
    stepIndex,
    stepCount: steps.length,
    attempts,
    lastAttempt,
    lastResult: lastAttempt?.result,
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === steps.length - 1,
    isStepDone: attempts.length > 0,
    isFinished,
  }
}
