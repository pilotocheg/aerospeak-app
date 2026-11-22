import { describe, expect, it } from 'vitest'

import { getChartUnit } from '@/entities/aerodrome/lib/get-chart-unit'

describe('getChartUnit', () => {
  it("is 1% of the chart's larger side", () => {
    const { unit } = getChartUnit('-500 -300 2000 1200')

    expect(unit).toBe(20)
  })

  it('returns the origin and height of the view box', () => {
    const { minX, minY, height } = getChartUnit('-500 -300 2000 1200')

    expect({ minX, minY, height }).toEqual({ minX: -500, minY: -300, height: 1200 })
  })
})
