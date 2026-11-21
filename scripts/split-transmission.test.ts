import { describe, expect, it } from 'vitest'

import { splitTransmission } from './split-transmission'

describe('splitTransmission', () => {
  it('splits a clearance into callsign, station, body and wind', () => {
    const parts = splitTransmission('SP-TFA, Poznań Tower, cleared to land, wind 270 degrees 10 knots.')

    expect(parts).toEqual(['SP-TFA', 'Poznań Tower', 'cleared to land', 'wind 270 degrees 10 knots'])
  })

  it('puts "negative, I say again" in place of the station of a correction', () => {
    const parts = splitTransmission('SP-TFA, negative, I say again, taxi to holding point runway 28 via Alpha.')

    expect(parts).toEqual(['SP-TFA', 'negative, I say again', 'taxi to holding point runway 28 via Alpha.'])
  })

  it('keeps the same body clip for a clearance and its correction', () => {
    const [, , clearanceBody] = splitTransmission('SP-TFA, Poznań Ground, taxi to holding point runway 28 via Alpha.')
    const [, , correctionBody] = splitTransmission(
      'SP-TFA, negative, I say again, taxi to holding point runway 28 via Alpha.',
    )

    expect(correctionBody).toBe(clearanceBody)
  })
})
