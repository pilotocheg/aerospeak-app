import { describe, expect, it } from 'vitest'

import { findChartByAirport } from './find-chart-by-airport'

const EPPO = { icao: 'EPPO' }
const EPPI = { icao: 'EPPI' }
const CHARTS = [EPPO, EPPI]

describe('findChartByAirport', () => {
  it('finds the chart by the ICAO code at the start of the "Airport" briefing value', () => {
    const chart = findChartByAirport(CHARTS, 'EPPI Piła')

    expect(chart).toBe(EPPI)
  })

  it('ignores case and surrounding spaces', () => {
    const chart = findChartByAirport(CHARTS, '  eppo Poznań-Ławica')

    expect(chart).toBe(EPPO)
  })

  it('finds nothing for an aerodrome without a chart', () => {
    const chart = findChartByAirport(CHARTS, 'EPWA Warszawa')

    expect(chart).toBeUndefined()
  })

  it('finds nothing without an airport', () => {
    const chart = findChartByAirport(CHARTS, undefined)

    expect(chart).toBeUndefined()
  })
})
