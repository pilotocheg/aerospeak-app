import { describe, expect, it } from 'vitest'

import { getSpotCaption } from '@/widgets/practice-player/lib/get-spot-caption'

describe('getSpotCaption', () => {
  it('is the caption when the spot is on the chart', () => {
    expect(getSpotCaption('Holding point A', true)).toBe('Holding point A')
  })

  it('marks a spot that is not on the chart', () => {
    expect(getSpotCaption('Holding point A', false)).toBe('Holding point A (off chart)')
  })
})
