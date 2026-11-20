import type { ChartSpot } from '@/entities/aerodrome'

type AircraftMarkerProps = {
  spot: ChartSpot
  /** Wingspan in SVG units. */
  size: number
}

/** Top-down light aircraft pointing up (north) at heading 0. */
export const AircraftMarker = ({ spot, size }: AircraftMarkerProps) => (
  <g transform={`translate(${spot.x} ${spot.y}) rotate(${spot.heading}) scale(${size / 20})`}>
    <circle r="14" className="animate-pulse fill-primary/25" />
    <path
      d="M0 -10 C1 -10 1.3 -8.5 1.3 -6 V-3 L10 -1.5 V1 L1.3 0.5 V5.5 L4 7 V8.8 L0 8 L-4 8.8 V7 L-1.3 5.5 V0.5 L-10 1 V-1.5 L-1.3 -3 V-6 C-1.3 -8.5 -1 -10 0 -10 Z"
      className="fill-primary stroke-black"
      strokeWidth="0.6"
    />
  </g>
)
