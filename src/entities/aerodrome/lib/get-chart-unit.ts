/** 1% of the chart's larger side, so sizes scale with the chart and labels stay readable on every aerodrome. */
export const getChartUnit = (viewBox: string) => {
  const [minX, minY, width, height] = viewBox.split(' ').map(Number)
  return { minX, minY, height, unit: Math.max(width, height) / 100 }
}
