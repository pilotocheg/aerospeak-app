/** Point on a chart in SVG units (metres), heading in degrees true. */
export type ChartSpot = {
  x: number
  y: number
  heading: number
}

export type AerodromeChartData = {
  icao: string
  name: string
  viewBox: string
  runway: {
    d: string
    centerline: string
    designators: { label: string; x: number; y: number }[]
  }
  taxiways: string[]
  taxiwayLabels: { ref: string; x: number; y: number }[]
  aprons: string[]
  buildings: string[]
  /** Keyed by the lower-case "Position" briefing value. */
  spots: Record<string, ChartSpot>
}
