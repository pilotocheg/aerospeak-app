import { getAirspaceChart, getAirspaceSpot } from '@/entities/aerodrome'
import type { AirspaceVisualDto } from '@/shared/api'

import { AircraftMarker } from './aircraft-marker'

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
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1 bg-sky-950/40 text-center">
        {airport && <p className="font-semibold">{airport}</p>}
        <p className="text-sm text-muted-foreground">{caption}</p>
      </div>
    )
  }

  const spot = getAirspaceSpot(chart, point, direction)
  const active = point.trim().toLowerCase()
  const [minX, minY, width, height] = chart.viewBox.split(' ').map(Number)
  // Sizes scale with the chart so labels stay readable on both aerodromes.
  const unit = Math.max(width, height) / 100
  const scaleBar = { x: minX + unit * 3, y: minY + height - unit * 4 }

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-sky-950/40">
      <svg
        viewBox={chart.viewBox}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`${chart.icao} ${chart.name} VFR chart, aircraft ${caption.toLowerCase()}`}
      >
        {chart.areas.map((area) => (
          <g key={area.label}>
            <path
              d={area.d}
              className={area.d.endsWith('Z') ? 'fill-rose-400/10 stroke-sky-400' : 'fill-none stroke-sky-400'}
              strokeWidth={unit * 0.25}
              strokeDasharray={area.d.endsWith('Z') ? `${unit * 1.2} ${unit * 0.8}` : undefined}
            />
            <text
              transform={`translate(${area.labelPosition.x} ${area.labelPosition.y}) rotate(${area.labelPosition.angle})`}
              className="fill-sky-300 font-semibold"
              fontSize={unit * 1.9}
              textAnchor="middle"
            >
              {area.label}
            </text>
          </g>
        ))}
        <g className="fill-slate-400" fontSize={unit * 2} textAnchor="middle" dominantBaseline="central">
          {chart.towns.map((town) => (
            <text key={town.label} x={town.x} y={town.y}>
              {town.label}
            </text>
          ))}
        </g>
        <g className="fill-none stroke-rose-400/80" strokeWidth={unit * 0.3} strokeLinejoin="round">
          {chart.routes.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <circle r={unit * 2.2} className="fill-none stroke-sky-300" strokeWidth={unit * 0.35} />
        <path d={chart.runway} className="stroke-slate-100" strokeWidth={unit * 0.7} strokeLinecap="round" />
        <g fontSize={unit * 2.1} className="font-bold" dominantBaseline="central">
          {Object.entries(chart.points).map(([key, vfrPoint]) => {
            const isActive = key === active
            // Labels point away from the aerodrome, so the points around it don't overlap.
            const bearing = vfrPoint.labelBearing ?? (Math.atan2(vfrPoint.x, -vfrPoint.y) * 180) / Math.PI
            const dx = Math.sin((bearing * Math.PI) / 180)
            const dy = -Math.cos((bearing * Math.PI) / 180)
            const offset = unit * (isActive ? 3.4 : 1.8)
            return (
              <g key={key} transform={`translate(${vfrPoint.x} ${vfrPoint.y})`}>
                <circle
                  r={unit * (isActive ? 1.3 : 0.9)}
                  className={isActive ? 'fill-yellow-400 stroke-black' : 'fill-slate-900 stroke-rose-400'}
                  strokeWidth={unit * 0.35}
                />
                <text
                  x={dx * offset}
                  y={dy * offset}
                  textAnchor={dx > 0.3 ? 'start' : dx < -0.3 ? 'end' : 'middle'}
                  className={isActive ? 'fill-yellow-300 stroke-slate-950' : 'fill-rose-300 stroke-slate-950'}
                  strokeWidth={unit * 0.4}
                  paintOrder="stroke"
                >
                  {vfrPoint.name.toUpperCase()}
                </text>
              </g>
            )
          })}
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

      <div className="pointer-events-none absolute top-2 left-2 rounded bg-background/70 px-2 py-1 text-xs backdrop-blur">
        <p className="font-semibold">
          {chart.icao} {chart.name}
        </p>
        <p className="text-muted-foreground">{spot ? caption : `${caption} (off chart)`}</p>
      </div>
      <p className="pointer-events-none absolute top-2 right-3 text-xs font-bold text-slate-300">N ↑</p>
      <p className="pointer-events-none absolute right-2 bottom-1 text-[10px] text-slate-400">
        Simplified from AIP Poland (PANSA), not for navigation
      </p>
    </div>
  )
}
