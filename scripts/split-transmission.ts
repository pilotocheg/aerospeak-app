const CALLSIGN = /^([A-Z0-9]{1,2}-[A-Z]{3,4}),\s*/
const WIND = /,\s*(wind \d{3} degrees \d+ knots)\.?$/
const CORRECTION = /^(negative, I say again),\s*/
const STATION = /^([^,]+ (?:Delivery|Ground|Tower|Approach|Radio|Information|Info)),\s*/

/**
 * "SP-TFA, Poznań Tower, cleared to land, wind 270 degrees 10 knots." -> four clips: callsign,
 * station, body, wind. A correction ("SP-TFA, negative, I say again, cleared to land, …") has
 * "negative, I say again" instead of the station, so its body is the same clip as in the
 * clearance.
 */
export const splitTransmission = (atcText: string) => {
  let body = atcText.trim()
  /** Cuts the part the pattern matches out of the body and returns it. */
  const take = (pattern: RegExp) => {
    const part = pattern.exec(body)?.[1]
    if (part) body = body.replace(pattern, '')
    return part
  }
  const callsign = take(CALLSIGN)
  const correction = take(CORRECTION)
  const station = take(STATION)
  const wind = take(WIND)
  return [callsign, correction, station, body, wind].filter((part): part is string => Boolean(part))
}
