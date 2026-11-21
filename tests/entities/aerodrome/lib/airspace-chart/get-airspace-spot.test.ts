import { describe, expect, it } from 'vitest'

import type { AirspaceChartData } from '@/entities/aerodrome/model/types'
import { getAirspaceSpot } from '@/entities/aerodrome/lib/airspace-chart/get-airspace-spot'

// The ARP is at 0 0 and y grows to the south.
const NORTH_POINT = { name: 'November', x: 0, y: -5000 }
const EAST_POINT = { name: 'Echo', x: 5000, y: 0 }

const chart: AirspaceChartData = {
  icao: 'EPPI',
  name: 'Piła',
  viewBox: '-10000 -10000 20000 20000',
  runway: 'M0 0',
  areas: [],
  routes: [],
  towns: [],
  points: { november: NORTH_POINT, echo: EAST_POINT },
}

describe('getAirspaceSpot', () => {
  it('heads south to the aerodrome from a point north of it', () => {
    const spot = getAirspaceSpot(chart, 'November', 'inbound')

    expect(spot).toEqual({ x: 0, y: -5000, heading: 180 })
  })

  it('heads away from the aerodrome when outbound', () => {
    const spot = getAirspaceSpot(chart, 'November', 'outbound')

    expect(spot?.heading).toBe(0)
  })

  it('heads west to the aerodrome from a point east of it', () => {
    const spot = getAirspaceSpot(chart, 'Echo', 'inbound')

    expect(spot?.heading).toBe(270)
  })

  it('finds the point regardless of case and spaces', () => {
    const spot = getAirspaceSpot(chart, ' ECHO ', 'inbound')

    expect(spot).toBeDefined()
  })

  it('returns nothing for a point that is not on the chart', () => {
    const spot = getAirspaceSpot(chart, 'Whiskey', 'inbound')

    expect(spot).toBeUndefined()
  })
})
