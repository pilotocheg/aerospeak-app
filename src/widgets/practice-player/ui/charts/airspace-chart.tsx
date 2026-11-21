import { getAirspaceChart, getAirspaceSpot, getChartUnit } from '@/entities/aerodrome'
import type { AirspaceVisualDto } from '@/shared/api'

import { getSpotCaption } from '../../lib/get-spot-caption'
import { AircraftMarker } from './aircraft-marker'
import { ChartFallback } from './chart-fallback'
import { AirspaceArea } from './airspace-area'
import { ChartLegend } from './chart-legend'
import { VfrPointMarker } from './vfr-point-marker'

type AirspaceChartProps = {
  airport?: string
  point: string
  direction: AirspaceVisualDto['direction']
}

const SCALE_BAR_M = 5000

/** Simplified north-up VFR operations chart with the aircraft over a VFR reporting point. */
export const AirspaceChart = ({ airport, point, direction }: AirspaceChartProps) => {
  const chart = getAirspaceChart(airport)
  const caption = `${direction === 'inbound' ? 'Inbound' : 'Outbound'} · ${point}`

  if (!chart) {
    return <ChartFallback title={airport} caption={caption} />
  }

  const { icao, name, viewBox, runway, areas, routes, towns, points } = chart
  const spot = getAirspaceSpot(chart, point, direction)
  const activePointKey = point.trim().toLowerCase()
  const { minX, minY, height, unit } = getChartUnit(viewBox)
  const scaleBar = { x: minX + unit * 3, y: minY + height - unit * 4 }

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-sky-950/40">
      <svg
        viewBox={viewBox}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`${icao} ${name} VFR chart, aircraft ${caption.toLowerCase()}`}
      >
        {areas.map((area) => (
          <AirspaceArea key={area.label} area={area} unit={unit} />
        ))}
        <g className="fill-slate-400" fontSize={unit * 2} textAnchor="middle" dominantBaseline="central">
          {towns.map((town) => (
            <text key={town.label} x={town.x} y={town.y}>
              {town.label}
            </text>
          ))}
        </g>
        <g className="fill-none stroke-rose-400/80" strokeWidth={unit * 0.3} strokeLinejoin="round">
          {routes.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <circle r={unit * 2.2} className="fill-none stroke-sky-300" strokeWidth={unit * 0.35} />
        <path d={runway} className="stroke-slate-100" strokeWidth={unit * 0.7} strokeLinecap="round" />
        <g fontSize={unit * 2.1} className="font-bold" dominantBaseline="central">
          {Object.entries(points).map(([key, vfrPoint]) => (
            <VfrPointMarker key={key} point={vfrPoint} unit={unit} isActive={key === activePointKey} />
          ))}
        </g>
        {spot && <AircraftMarker spot={spot} size={unit * 5} />}
        <g className="stroke-slate-300" strokeWidth={unit * 0.25}>
          <path
            d={`M${scaleBar.x} ${scaleBar.y - unit * 0.6} V${scaleBar.y} H${scaleBar.x + SCALE_BAR_M} V${scaleBar.y - unit * 0.6}`}
            fill="none"
          />
          <text
            x={scaleBar.x + SCALE_BAR_M / 2}
            y={scaleBar.y - unit * 1}
            className="fill-slate-300 stroke-none"
            fontSize={unit * 1.8}
            textAnchor="middle"
          >
            5 km
          </text>
        </g>
      </svg>

      <ChartLegend title={`${icao} ${name}`} caption={getSpotCaption(caption, Boolean(spot))} />
      <p className="pointer-events-none absolute right-2 bottom-1 text-[10px] text-slate-400">
        Simplified from AIP Poland (PANSA), not for navigation
      </p>
    </div>
  )
}
