import type { AerodromeChartData } from '../../model/types'

export const getChartSpot = (chart: AerodromeChartData, position?: string) =>
  position ? chart.spots[position.trim().toLowerCase()] : undefined
