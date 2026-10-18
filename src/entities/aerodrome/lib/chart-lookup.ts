import { eppiChart } from '../model/charts/eppi'
import { eppoChart } from '../model/charts/eppo'
import type { AerodromeChartData } from '../model/types'

const charts = [eppoChart, eppiChart]

/** Matches the "Airport" briefing value, e.g. "EPPO Poznań-Ławica", by its ICAO code. */
export const getAerodromeChart = (airport?: string): AerodromeChartData | undefined => {
  const code = airport?.trim().slice(0, 4).toUpperCase()
  return charts.find((chart) => chart.icao === code)
}

export const getChartSpot = (chart: AerodromeChartData, position?: string) =>
  position ? chart.spots[position.trim().toLowerCase()] : undefined
