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

/** VFR reporting point on an airspace chart, in metres from the ARP. */
export type AirspacePoint = {
  /** As in the AIP, e.g. "Delta". */
  name: string
  x: number
  y: number
  /** Where the label goes, degrees true; by default away from the aerodrome. */
  labelBearing?: number
}

/** Simplified VFR operations chart: aerodrome airspace, VFR points and routes. */
export type AirspaceChartData = {
  icao: string
  name: string
  viewBox: string
  runway: string
  /** CTR / MCTR outlines or boundary lines, labelled along an edge. */
  areas: { label: string; d: string; labelPosition: { x: number; y: number; angle: number } }[]
  routes: string[]
  towns: { label: string; x: number; y: number }[]
  /** Keyed by the lower-case point name. */
  points: Record<string, AirspacePoint>
}
