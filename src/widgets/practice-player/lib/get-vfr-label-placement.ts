import type { AirspacePoint } from '@/entities/aerodrome'

/** Labels point away from the aerodrome: anchor them on the side facing the point. */
const getLabelAnchor = (dx: number): 'start' | 'end' | 'middle' => {
  if (dx > 0.3) return 'start'
  if (dx < -0.3) return 'end'
  return 'middle'
}

/** Where a VFR point's label goes, so the points around the aerodrome don't overlap. */
export const getVfrLabelPlacement = (point: AirspacePoint, offset: number) => {
  const { x, y, labelBearing } = point
  const bearing = labelBearing ?? (Math.atan2(x, -y) * 180) / Math.PI
  const bearingRadians = (bearing * Math.PI) / 180
  const dx = Math.sin(bearingRadians)
  const dy = -Math.cos(bearingRadians)

  return { x: dx * offset, y: dy * offset, textAnchor: getLabelAnchor(dx) }
}
