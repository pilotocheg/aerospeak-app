import { eppiChart } from '../model/charts/eppi'
import { eppoChart } from '../model/charts/eppo'
import type { AerodromeChartData } from '../model/types'

import { findChartByAirport } from './find-chart-by-airport'

const charts = [eppoChart, eppiChart]

export const getAerodromeChart = (airport?: string): AerodromeChartData | undefined =>
  findChartByAirport(charts, airport)
