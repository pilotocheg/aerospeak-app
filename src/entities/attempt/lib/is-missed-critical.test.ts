import { describe, expect, it } from 'vitest'

import { buildElementResult } from '@/shared/testing'

import { isMissedCritical } from './is-missed-critical'

describe('isMissedCritical', () => {
  it('is true for a critical element that was missed', () => {
    const element = buildElementResult({ critical: true, status: 'missed' })

    expect(isMissedCritical(element)).toBe(true)
  })

  it('is false for a critical element said almost right', () => {
    const element = buildElementResult({ critical: true, status: 'partial' })

    expect(isMissedCritical(element)).toBe(false)
  })

  it('is false for a missed element that is not critical', () => {
    const element = buildElementResult({ critical: false, status: 'missed' })

    expect(isMissedCritical(element)).toBe(false)
  })
})
