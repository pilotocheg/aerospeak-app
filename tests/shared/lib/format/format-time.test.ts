import { describe, expect, it } from 'vitest'

import { formatTime } from '@/shared/lib/format/format-time'

describe('formatTime', () => {
  it.each([
    [0, '00:00'],
    [9.9, '00:09'],
    [75.4, '01:15'],
    [600, '10:00'],
  ])('formats %s seconds as %s', (seconds, expected) => {
    expect(formatTime(seconds)).toBe(expected)
  })

  it('shows negative time as zero', () => {
    const time = formatTime(-3)

    expect(time).toBe('00:00')
  })
})
