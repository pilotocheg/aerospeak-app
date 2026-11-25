import { describe, expect, it } from 'vitest'

import { computePracticedStats } from '@/entities/progress/lib/compute-practiced-stats'
import { buildScenarioProgress } from '@tests/builders'

describe('computePracticedStats', () => {
  it('counts practiced scenarios out of the given ones', () => {
    const progress = [buildScenarioProgress({ scenarioId: 'alpha' })]

    const { practiced, total } = computePracticedStats(progress, ['alpha', 'bravo'])

    expect({ practiced, total }).toEqual({ practiced: 1, total: 2 })
  })

  it('does not count a scenario attempted without a completed run', () => {
    const progress = [buildScenarioProgress({ scenarioId: 'alpha', runs: 0, bestScore: null, scores: [] })]

    const { practiced, practicedScenarioIds } = computePracticedStats(progress, ['alpha'])

    expect({ practiced, ids: [...practicedScenarioIds] }).toEqual({ practiced: 0, ids: [] })
  })

  it('ignores progress of scenarios that are no longer listed', () => {
    const progress = [buildScenarioProgress({ scenarioId: 'removed' })]

    const { practiced, practicedScenarioIds } = computePracticedStats(progress, ['alpha'])

    expect({ practiced, ids: [...practicedScenarioIds] }).toEqual({ practiced: 0, ids: [] })
  })

  it('averages the best scores of the practiced scenarios', () => {
    const progress = [
      buildScenarioProgress({ scenarioId: 'alpha', bestScore: 80 }),
      buildScenarioProgress({ scenarioId: 'bravo', bestScore: 91 }),
      buildScenarioProgress({ scenarioId: 'removed', bestScore: 10 }),
    ]

    const { averageBest } = computePracticedStats(progress, ['alpha', 'bravo', 'charlie'])

    expect(averageBest).toBe(86)
  })

  it('has no average before the first practiced scenario', () => {
    const { averageBest } = computePracticedStats([], ['alpha'])

    expect(averageBest).toBeNull()
  })
})
