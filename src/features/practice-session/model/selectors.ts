import { usePracticeStore } from './practice-store'

const NO_ATTEMPTS: never[] = []

export const usePracticeScenarioId = () => usePracticeStore((state) => state.scenarioId)

export const useStepIndex = () => usePracticeStore((state) => state.stepIndex)

export const useIsFinished = () => usePracticeStore((state) => state.isFinished)

export const useAttemptsByStep = () => usePracticeStore((state) => state.attemptsByStep)

export const useStepAttempts = (stepId: string | undefined) =>
  usePracticeStore((state) => (stepId ? state.attemptsByStep[stepId] : undefined) ?? NO_ATTEMPTS)
