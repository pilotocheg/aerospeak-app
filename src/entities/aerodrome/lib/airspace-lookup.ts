import { eppiAirspace } from '../model/airspace/eppi'
import { eppoAirspace } from '../model/airspace/eppo'
import type { AirspaceChartData, ChartSpot } from '../model/types'

const charts = [eppoAirspace, eppiAirspace]

/** Matches the "Airport" briefing value, e.g. "EPPO Poznań-Ławica", by its ICAO code. */
export const getAirspaceChart = (airport?: string): AirspaceChartData | undefined => {
  const code = airport?.trim().slice(0, 4).toUpperCase()
  return charts.find((chart) => chart.icao === code)
}

/** The aircraft over a VFR point, heading to the aerodrome (inbound) or away from it (outbound). */
export const getAirspaceSpot = (
  chart: AirspaceChartData,
  point: string,
  direction: 'inbound' | 'outbound',
): ChartSpot | undefined => {
  const spot = chart.points[point.trim().toLowerCase()]
  if (!spot) return undefined
  // y grows to the south, so north is -y; the ARP is at 0 0.
  const toAerodrome = (Math.atan2(-spot.x, spot.y) * 180) / Math.PI
  const heading = direction === 'inbound' ? toAerodrome : toAerodrome + 180
  return { x: spot.x, y: spot.y, heading: (heading + 360) % 360 }
}
