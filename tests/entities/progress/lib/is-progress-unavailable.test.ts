import { describe, expect, it } from 'vitest'

import { isProgressUnavailable } from '@/entities/progress/lib/is-progress-unavailable'

describe('isProgressUnavailable', () => {
  it('is unavailable when loading failed with nothing to show', () => {
    expect(isProgressUnavailable(true, false)).toBe(true)
  })

  it('keeps showing earlier progress when a refetch fails', () => {
    expect(isProgressUnavailable(true, true)).toBe(false)
  })

  it('is available when nothing failed', () => {
    expect(isProgressUnavailable(false, false)).toBe(false)
  })
})
