import { describe, expect, it } from 'vitest'

import { findNextScenario } from '@/entities/progress/lib/find-next-scenario'
import { buildPracticePack, buildScenarioSummary } from '@tests/builders'

const alpha = buildScenarioSummary({ id: 'alpha' })
const bravo = buildScenarioSummary({ id: 'bravo' })
const charlie = buildScenarioSummary({ id: 'charlie' })

describe('findNextScenario', () => {
  it('picks the first scenario before any practice', () => {
    const packs = [buildPracticePack({ scenarios: [alpha, bravo] })]

    const nextScenario = findNextScenario(packs, new Set())

    expect(nextScenario?.id).toBe('alpha')
  })

  it('skips practiced scenarios', () => {
    const packs = [buildPracticePack({ scenarios: [alpha, bravo] })]

    const nextScenario = findNextScenario(packs, new Set(['alpha']))

    expect(nextScenario?.id).toBe('bravo')
  })

  it('follows pack order, not list order', () => {
    const packs = [
      buildPracticePack({ id: 'second', order: 2, scenarios: [charlie] }),
      buildPracticePack({ id: 'first', order: 1, scenarios: [alpha] }),
    ]

    const nextScenario = findNextScenario(packs, new Set())

    expect(nextScenario?.id).toBe('alpha')
  })

  it('finds nothing once every scenario is practiced', () => {
    const packs = [buildPracticePack({ scenarios: [alpha] })]

    const nextScenario = findNextScenario(packs, new Set(['alpha']))

    expect(nextScenario).toBeUndefined()
  })
})
