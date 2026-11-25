import { afterEach, describe, expect, it, vi } from 'vitest'

import { clearLegacyProgress } from '@/entities/progress/lib/clear-legacy-progress'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('clearLegacyProgress', () => {
  it('removes the old local progress key', () => {
    const removeItem = vi.fn()
    vi.stubGlobal('window', { localStorage: { removeItem } })

    clearLegacyProgress()

    expect(removeItem).toHaveBeenCalledWith('aerospeak.progress')
  })

  it('does not throw when storage is blocked', () => {
    const removeItem = vi.fn(() => {
      throw new Error('SecurityError')
    })
    vi.stubGlobal('window', { localStorage: { removeItem } })

    expect(() => clearLegacyProgress()).not.toThrow()
  })
})
