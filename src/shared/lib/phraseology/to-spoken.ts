/**
 * Turns written phraseology into ICAO-style speech for TTS:
 *   "SP-TFA, runway 28, QNH 1013" -> "Sierra Papa Tango Foxtrot Alpha, runway two eight, Q N H one zero one tree"
 * Shared by the browser ("Hear expected response") and scripts/generate-atc-audio.ts.
 *
 * Number rules follow ICAO Doc 9432 2.4 (Polish edition, the source of truth for our
 * Polish aerodromes), the same rules the backend scores against (src/scoring/spoken.ts there):
 *   digits one by one with tree, fife, niner     QNH 1013 -> Q N H one zero one tree
 *   whole hundreds/thousands for altitude        2500 feet -> two thousand fife hundred feet
 *   FL digit by digit, FL100 as "one hundred"   FL 65 -> flight level six fife
 *   squawk/QNH in whole thousands                squawk 7000 -> squawk seven thousand
 *   frequencies with all six figures, four when the last two are zeros
 *                                                121.900 -> one two one decimal niner
 */

const NATO: Record<string, string> = {
  A: 'Alpha',
  B: 'Bravo',
  C: 'Charlie',
  D: 'Delta',
  E: 'Echo',
  F: 'Foxtrot',
  G: 'Golf',
  H: 'Hotel',
  I: 'India',
  J: 'Juliett',
  K: 'Kilo',
  L: 'Lima',
  M: 'Mike',
  N: 'November',
  O: 'Oscar',
  P: 'Papa',
  Q: 'Quebec',
  R: 'Romeo',
  S: 'Sierra',
  T: 'Tango',
  U: 'Uniform',
  V: 'Victor',
  W: 'Whiskey',
  X: 'X-ray',
  Y: 'Yankee',
  Z: 'Zulu',
}

// ICAO digit words (Doc 9432 2.4.1); "four" is said FOW-er by a person, TTS reads "four" fine.
const DIGITS = ['zero', 'one', 'two', 'tree', 'four', 'fife', 'six', 'seven', 'eight', 'niner']

const spellDigits = (digits: string) =>
  digits
    .split('')
    .map((d) => DIGITS[Number(d)])
    .join(' ')

const spellThousands = (value: number) => {
  const thousands = Math.floor(value / 1000)
  const hundreds = Math.floor((value % 1000) / 100)
  return [thousands ? `${spellDigits(String(thousands))} thousand` : '', hundreds ? `${DIGITS[hundreds]} hundred` : '']
    .filter(Boolean)
    .join(' ')
}

export const toSpoken = (text: string) =>
  text
    // Registrations: SP-TFA -> Sierra Papa Tango Foxtrot Alpha
    .replace(/\b([A-Z]{1,2})-([A-Z]{2,4})\b/g, (_, a: string, b: string) =>
      (a + b)
        .split('')
        .map((ch) => NATO[ch])
        .join(' '),
    )
    // Flight levels: FL 65 -> flight level six fife, FL 100 -> flight level one hundred
    .replace(/\b(?:FL|[Ff]light level) ?(\d{2,3})\b/g, (_, n: string) => {
      const value = Number(n)
      return value % 100 === 0
        ? `flight level ${spellDigits(String(value / 100))} hundred`
        : `flight level ${spellDigits(String(value))}`
    })
    // Squawk and QNH in whole thousands: squawk 7000 -> squawk seven thousand
    .replace(/\b(squawk|QNH) (\d{4})\b/gi, (match, word: string, n: string) => {
      const value = Number(n)
      return value % 1000 === 0 ? `${word} ${spellDigits(String(value / 1000))} thousand` : match
    })
    .replace(/\bQNH\b/g, 'Q N H')
    .replace(/\bVFR\b/g, 'V F R')
    .replace(/\bCTR\b/g, 'C T R')
    .replace(/\bATIS\b/g, 'A T I S')
    // Altitude, height, visibility: 2500 feet -> two thousand fife hundred feet, 500 feet -> fife hundred feet
    .replace(/\b(\d{3,5}) (feet|ft|metres|meters)\b/g, (match, n: string, unit: string) => {
      const value = Number(n)
      return value % 100 === 0 ? `${spellThousands(value)} ${unit}` : match
    })
    // Frequencies: 124.140 -> one two four decimal one four zero, 121.900 -> one two one decimal niner
    .replace(/\b(\d{3})\.(\d{1,3})\b/g, (_, a: string, b: string) => {
      const fraction = b.length === 3 && b.endsWith('00') ? b[0] : b
      return `${spellDigits(a)} decimal ${spellDigits(fraction)}`
    })
    // Runway designators with L/R/C suffix: 28L -> two eight left
    .replace(
      /\b(\d{2})([LRC])\b/g,
      (_, n: string, side: string) => `${spellDigits(n)} ${{ L: 'left', R: 'right', C: 'center' }[side]}`,
    )
    // Any other number: digit by digit
    .replace(/\b\d+\b/g, (n) => spellDigits(n))
