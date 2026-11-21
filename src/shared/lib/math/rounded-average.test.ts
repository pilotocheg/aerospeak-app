import { describe, expect, it } from 'vitest'

import { roundedAverage } from './rounded-average'

describe('roundedAverage', () => {
  it('rounds the mean to a whole number', () => {
    const mean = roundedAverage([70, 75])

    expect(mean).toBe(73)
  })

  it('returns null for an empty list', () => {
    const mean = roundedAverage([])

    expect(mean).toBeNull()
  })
})
