/** Matches the "Airport" briefing value, e.g. "EPPO Poznań-Ławica", by its ICAO code. */
export const findChartByAirport = <Chart extends { icao: string }>(charts: Chart[], airport?: string) => {
  const code = airport?.trim().slice(0, 4).toUpperCase()
  return charts.find((chart) => chart.icao === code)
}
