import { describe, expect, it } from 'vitest'

import { getVfrLabelPlacement } from '@/widgets/practice-player/lib/get-vfr-label-placement'

const OFFSET = 10

describe('getVfrLabelPlacement', () => {
  it('puts the label of a point east of the aerodrome further east, anchored at its start', () => {
    const label = getVfrLabelPlacement({ name: 'Echo', x: 5000, y: 0 }, OFFSET)

    expect(label).toMatchObject({ x: OFFSET, textAnchor: 'start' })
  })

  it('anchors the label of a point west of the aerodrome at its end', () => {
    const label = getVfrLabelPlacement({ name: 'Whiskey', x: -5000, y: 0 }, OFFSET)

    expect(label.textAnchor).toBe('end')
  })

  it('centres the label of a point north of the aerodrome above it', () => {
    const label = getVfrLabelPlacement({ name: 'November', x: 0, y: -5000 }, OFFSET)

    expect(label).toMatchObject({ y: -OFFSET, textAnchor: 'middle' })
  })

  it('uses the label bearing of the point when it has one', () => {
    const label = getVfrLabelPlacement({ name: 'Echo', x: 5000, y: 0, labelBearing: 180 }, OFFSET)

    expect(label.y).toBeCloseTo(OFFSET)
  })
})
