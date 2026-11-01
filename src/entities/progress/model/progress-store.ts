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
  /** Firebase uid of the account this progress belongs to. */
  ownerUid: string | null
  byScenario: Record<string, ScenarioProgress>
  recordScenarioResult: (scenarioId: string, score: number) => void
  setOwner: (uid: string) => void
}

// Progress must survive reloads, so this store is persisted.
export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ownerUid: null,
      byScenario: {},
      // The browser keeps one progress record: another account signing in starts from zero.
      // Progress saved before accounts existed (no owner) goes to the first account that signs in.
      setOwner: (uid) =>
        set((state) =>
          state.ownerUid === uid ? state : { ownerUid: uid, byScenario: state.ownerUid ? {} : state.byScenario },
        ),
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
