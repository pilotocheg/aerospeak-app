import { describe, expect, it } from 'vitest'

import { formatDuration } from './format-duration'

describe('formatDuration', () => {
  it('shows durations under a minute in seconds', () => {
    const duration = formatDuration(45)

    expect(duration).toBe('45s')
  })

  it('shows longer durations in whole minutes', () => {
    const duration = formatDuration(150)

    expect(duration).toBe('3 min')
  })
})
