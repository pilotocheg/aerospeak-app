import { describe, expect, it } from 'vitest'

import type { ScenarioProgress } from '@/entities/progress'
import { computeLocalPracticedStats } from '@/entities/progress/lib/compute-local-practiced-stats'

const buildProgress = (bestScore: number): ScenarioProgress => ({
  attempts: 1,
  bestScore,
  scores: [bestScore],
  lastPlayedAt: '2026-11-23T10:00:00.000Z',
})

describe('computeLocalPracticedStats', () => {
  it('counts practiced scenarios out of the given ones', () => {
    const progress = { alpha: buildProgress(80) }

    const { practiced, total } = computeLocalPracticedStats(progress, ['alpha', 'bravo'])

    expect({ practiced, total }).toEqual({ practiced: 1, total: 2 })
  })

  it('ignores progress of scenarios that are no longer listed', () => {
    const progress = { removed: buildProgress(90) }

    const { practiced, practicedScenarioIds } = computeLocalPracticedStats(progress, ['alpha'])

    expect({ practiced, ids: [...practicedScenarioIds] }).toEqual({ practiced: 0, ids: [] })
  })

  it('averages the best scores of the practiced scenarios', () => {
    const progress = { alpha: buildProgress(80), bravo: buildProgress(91), removed: buildProgress(10) }

    const { averageBest } = computeLocalPracticedStats(progress, ['alpha', 'bravo', 'charlie'])

    expect(averageBest).toBe(86)
  })

  it('has no average before the first practiced scenario', () => {
    const { averageBest } = computeLocalPracticedStats({}, ['alpha'])

    expect(averageBest).toBeNull()
  })
})
