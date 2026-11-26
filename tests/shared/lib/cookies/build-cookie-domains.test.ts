import { describe, expect, it } from 'vitest'

import { buildCookieDomains } from '@/shared/lib/cookies'

describe('buildCookieDomains', () => {
  it('lists the host and each parent domain without the top-level domain alone', () => {
    const domains = buildCookieDomains('app.example.com')

    expect(domains).toEqual(['app.example.com', '.app.example.com', '.example.com'])
  })

  it('returns just the host for a single-label host', () => {
    const domains = buildCookieDomains('localhost')

    expect(domains).toEqual(['localhost'])
  })
})
