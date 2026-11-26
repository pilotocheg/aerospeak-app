import { beforeEach, describe, expect, it } from 'vitest'

import { useConsentStore } from '@/features/analytics-consent/model/consent-store'

describe('useConsentStore', () => {
  beforeEach(() => {
    useConsentStore.setState({ consent: null })
  })

  it('starts unanswered', () => {
    const { consent } = useConsentStore.getState()

    expect(consent).toBeNull()
  })

  it('records a granted consent', () => {
    useConsentStore.getState().grantConsent()

    expect(useConsentStore.getState().consent).toBe('granted')
  })

  it('records a withdrawn consent after it was granted', () => {
    useConsentStore.getState().grantConsent()

    useConsentStore.getState().denyConsent()

    expect(useConsentStore.getState().consent).toBe('denied')
  })
})
