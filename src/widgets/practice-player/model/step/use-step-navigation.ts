import { useCompletePractice, useGoToStep, useStartPractice } from '@/features/practice-session'
import type { ScenarioDto } from '@/shared/api'

type UseStepNavigationOptions = {
  scenario: ScenarioDto
  stepIndex: number
  isLastStep: boolean
  isStepDone: boolean
  /** While an attempt is being scored, the result belongs to this step: stay on it. */
  isSubmitting: boolean
  /** Clears what belongs to the step being left: open dialog, shown text, playing audio. */
  onLeaveStep: () => void
  onRestart: () => void
}

/** Moving between steps, finishing the scenario and starting it again. */
export const useStepNavigation = ({
  scenario,
  stepIndex,
  isLastStep,
  isStepDone,
  isSubmitting,
  onLeaveStep,
  onRestart,
}: UseStepNavigationOptions) => {
  const goToStep = useGoToStep()
  const completePractice = useCompletePractice()
  const startPractice = useStartPractice()

  const enterStep = (index: number) => {
    const isLockedAhead = index > stepIndex && !isStepDone
    if (isSubmitting || isLockedAhead) {
      return
    }
    goToStep(index)
    onLeaveStep()
  }

  const finish = () => {
    if (!isStepDone || isSubmitting) {
      return
    }
    onLeaveStep()
    completePractice(scenario)
  }

  const goPrevious = () => enterStep(stepIndex - 1)

  const goNext = () => {
    if (isLastStep) {
      finish()
    } else {
      enterStep(stepIndex + 1)
    }
  }

  const repeat = () => {
    startPractice(scenario.id)
    onRestart()
  }

  return { goPrevious, goNext, repeat }
}
