import { usePracticeStore } from './practice-store'

export const usePracticeScenarioId = () => usePracticeStore((state) => state.scenarioId)

export const useRunId = () => usePracticeStore((state) => state.runId)

export const useStepIndex = () => usePracticeStore((state) => state.stepIndex)

export const useIsFinished = () => usePracticeStore((state) => state.isFinished)

export const useAttemptsByStep = () => usePracticeStore((state) => state.attemptsByStep)
