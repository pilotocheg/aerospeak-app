/**
 * Turns written phraseology into ICAO-style speech for TTS:
 *   "SP-TFA, runway 28, QNH 1013" -> "Sierra Papa Tango Foxtrot Alpha, runway two eight, Q N H one zero one tree"
 * Shared by the browser ("Hear expected response") and scripts/generate-atc-audio.ts.
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

// "tree" and "fife" sound odd from generic TTS voices, so only "niner" is used.
const DIGITS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'niner']

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
    .replace(/\bQNH\b/g, 'Q N H')
    .replace(/\bVFR\b/g, 'V F R')
    .replace(/\bCTR\b/g, 'C T R')
    .replace(/\bATIS\b/g, 'A T I S')
    // Altitudes in feet: 2500 feet -> two thousand five hundred feet
    .replace(/\b(\d{3,5}) (feet|ft)\b/g, (match, n: string) => {
      const value = Number(n)
      return value % 100 === 0 && value >= 1000 ? `${spellThousands(value)} feet` : match
    })
    // Frequencies: 124.140 -> one two four decimal one four zero
    .replace(/\b(\d{3})\.(\d{1,3})\b/g, (_, a: string, b: string) => `${spellDigits(a)} decimal ${spellDigits(b)}`)
    // Runway designators with L/R/C suffix: 28L -> two eight left
    .replace(
      /\b(\d{2})([LRC])\b/g,
      (_, n: string, side: string) => `${spellDigits(n)} ${{ L: 'left', R: 'right', C: 'center' }[side]}`,
    )
    // Any other number: digit by digit
    .replace(/\b\d+\b/g, (n) => spellDigits(n))
