import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ScenarioProgress = {
  attempts: number
  bestScore: number
  /** Last scenario scores, newest last (max 20). */
  scores: number[]
  lastPlayedAt: string
}

type ProgressState = {
  byScenario: Record<string, ScenarioProgress>
  recordScenarioResult: (scenarioId: string, score: number) => void
}

// Guest progress must survive reloads, so this store is persisted.
export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      byScenario: {},
      recordScenarioResult: (scenarioId, score) =>
        set((state) => {
          const previous = state.byScenario[scenarioId]
          return {
            byScenario: {
              ...state.byScenario,
              [scenarioId]: {
                attempts: (previous?.attempts ?? 0) + 1,
                bestScore: Math.max(previous?.bestScore ?? 0, score),
                scores: [...(previous?.scores ?? []), score].slice(-20),
                lastPlayedAt: new Date().toISOString(),
              },
            },
          }
        }),
    }),
    { name: 'aerospeak.progress' },
  ),
)
