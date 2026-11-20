import { eppiAirspace } from '../model/airspace/eppi'
import { eppoAirspace } from '../model/airspace/eppo'
import type { AirspaceChartData } from '../model/types'

import { findChartByAirport } from './find-chart-by-airport'

const charts = [eppoAirspace, eppiAirspace]

export const getAirspaceChart = (airport?: string): AirspaceChartData | undefined => findChartByAirport(charts, airport)
