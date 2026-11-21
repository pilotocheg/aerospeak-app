import { describe, expect, it } from 'vitest'

import { average } from '@/shared/lib/math/average'

describe('average', () => {
  it('returns the arithmetic mean', () => {
    const mean = average([60, 80, 100])

    expect(mean).toBe(80)
  })

  it('returns 0 for an empty list', () => {
    const mean = average([])

    expect(mean).toBe(0)
  })
})
