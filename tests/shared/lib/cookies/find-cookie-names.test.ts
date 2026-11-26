import { describe, expect, it } from 'vitest'

import { findCookieNames } from '@/shared/lib/cookies'

describe('findCookieNames', () => {
  it('returns only the cookies whose name starts with the prefix', () => {
    const names = findCookieNames('_ga=GA1.1.123; theme=dark; _ga_ABC123=GS1.1.456', '_ga')

    expect(names).toEqual(['_ga', '_ga_ABC123'])
  })

  it('returns an empty list when there are no cookies', () => {
    const names = findCookieNames('', '_ga')

    expect(names).toEqual([])
  })
})
