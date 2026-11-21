import { describe, expect, it } from 'vitest'

import { toSpoken } from './to-spoken'

// ICAO Doc 9432 2.4, the same rules the backend scores against.
describe('toSpoken', () => {
  it('spells registrations with the NATO alphabet', () => {
    expect(toSpoken('SP-TFA')).toBe('Sierra Papa Tango Foxtrot Alpha')
  })

  it.each([
    ['runway 28', 'runway two eight'],
    ['QNH 1013', 'Q N H one zero one tree'],
    ['squawk 7421', 'squawk seven four two one'],
  ])('reads numbers digit by digit with ICAO digit words: %s', (written, spoken) => {
    expect(toSpoken(written)).toBe(spoken)
  })

  it.each([
    ['climb to 2500 feet', 'climb to two thousand fife hundred feet'],
    ['500 feet', 'fife hundred feet'],
  ])('reads whole hundreds of altitude as thousands and hundreds: %s', (written, spoken) => {
    expect(toSpoken(written)).toBe(spoken)
  })

  it('reads an altitude that is not a whole hundred digit by digit', () => {
    expect(toSpoken('2550 feet')).toBe('two fife fife zero feet')
  })

  it.each([
    ['FL 65', 'flight level six fife'],
    ['FL100', 'flight level one hundred'],
  ])('reads flight levels: %s', (written, spoken) => {
    expect(toSpoken(written)).toBe(spoken)
  })

  it.each([
    ['squawk 7000', 'squawk seven thousand'],
    ['QNH 1000', 'Q N H one thousand'],
  ])('reads squawk and QNH in whole thousands: %s', (written, spoken) => {
    expect(toSpoken(written)).toBe(spoken)
  })

  it.each([
    ['contact 124.140', 'contact one two four decimal one four zero'],
    ['contact 121.900', 'contact one two one decimal niner'],
  ])('reads frequencies, dropping two trailing zeros: %s', (written, spoken) => {
    expect(toSpoken(written)).toBe(spoken)
  })

  it('reads the runway side of a designator', () => {
    expect(toSpoken('runway 28L')).toBe('runway two eight left')
  })

  it('spells abbreviations letter by letter', () => {
    expect(toSpoken('VFR, CTR, ATIS')).toBe('V F R, C T R, A T I S')
  })
})
