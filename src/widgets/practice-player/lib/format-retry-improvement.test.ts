import { describe, expect, it } from 'vitest'

import { formatRetryImprovement } from './format-retry-improvement'

describe('formatRetryImprovement', () => {
  it.each([
    [12, '+12'],
    [0, '+0'],
    [-3, '-3'],
  ])('shows %s with its sign as %s', (improvement, expected) => {
    expect(formatRetryImprovement(improvement)).toBe(expected)
  })

  it('shows a dash without retries', () => {
    expect(formatRetryImprovement(null)).toBe('–')
  })
})
