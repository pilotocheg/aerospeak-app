import { create } from 'zustand'

import type { AttemptResultDto } from '@/shared/api'

export type StepAttempt = {
  result: AttemptResultDto
  recordingUrl: string
}

type PracticeState = {
  scenarioId: string | null
  /** Increments on every start, so effects can react to a restart of the same scenario. */
  runId: number
  stepIndex: number
  attemptsByStep: Record<string, StepAttempt[]>
  isFinished: boolean
  start: (scenarioId: string) => void
  goToStep: (stepIndex: number) => void
  addAttempt: (stepId: string, attempt: StepAttempt) => void
  finish: () => void
}

const revokeRecordings = (attemptsByStep: Record<string, StepAttempt[]>) =>
  Object.values(attemptsByStep)
    .flat()
    .forEach((attempt) => URL.revokeObjectURL(attempt.recordingUrl))

// Lives only while the practice screen is open: a reload starts the scenario again.
export const usePracticeStore = create<PracticeState>()((set, get) => ({
  scenarioId: null,
  runId: 0,
  stepIndex: 0,
  attemptsByStep: {},
  isFinished: false,
  start: (scenarioId) => {
    revokeRecordings(get().attemptsByStep)
    set((state) => ({ scenarioId, runId: state.runId + 1, stepIndex: 0, attemptsByStep: {}, isFinished: false }))
  },
  goToStep: (stepIndex) => set({ stepIndex }),
  addAttempt: (stepId, attempt) =>
    set((state) => ({
      attemptsByStep: {
        ...state.attemptsByStep,
        [stepId]: [...(state.attemptsByStep[stepId] ?? []), attempt],
      },
    })),
  finish: () => set({ isFinished: true }),
}))
