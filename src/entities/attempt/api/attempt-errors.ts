/** STT could not hear the transmission. Not the user's fault: retry without a score. */
export class SttFailedError extends Error {
  constructor() {
    super("Couldn't hear that clearly — try again.")
    this.name = 'SttFailedError'
  }
}

export class RateLimitedError extends Error {
  constructor() {
    super('Too many attempts in a short time. Wait a moment and try again.')
    this.name = 'RateLimitedError'
  }
}
