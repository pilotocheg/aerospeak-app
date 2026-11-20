import { useGoToStep, useStartPractice } from '@/features/practice-session'
import type { ScenarioDto } from '@/shared/api'

type UseStepNavigationOptions = {
  scenario: ScenarioDto
  stepIndex: number
  isLastStep: boolean
  isStepDone: boolean
  /** While an attempt is being scored, the result belongs to this step: stay on it. */
  isSubmitting: boolean
  /** Called after moving to another step: clears the step's dialog and shown text. */
  onEnterStep: () => void
  /** Called right before the run is completed: silences ATC, closes the dialog, resets the text. */
  onFinish: () => void
  onRestart: () => void
  /** Ends the run and stores its score (`useCompletePractice`). */
  completePractice: () => void
}

/** Moving between steps, finishing the scenario and starting it again. */
export const useStepNavigation = ({
  scenario,
  stepIndex,
  isLastStep,
  isStepDone,
  isSubmitting,
  onEnterStep,
  onFinish,
  onRestart,
  completePractice,
}: UseStepNavigationOptions) => {
  const goToStep = useGoToStep()
  const startPractice = useStartPractice()

  const enterStep = (index: number) => {
    const isLockedAhead = index > stepIndex && !isStepDone
    if (isSubmitting || isLockedAhead) {
      return
    }
    goToStep(index)
    onEnterStep()
  }

  const finish = () => {
    if (!isStepDone || isSubmitting) {
      return
    }
    onFinish()
    completePractice()
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
