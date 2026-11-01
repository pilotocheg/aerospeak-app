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

/** 403 from the backend: the profile is missing or the terms are not accepted (`POST /me`). */
export class ProfileRequiredError extends Error {
  constructor() {
    super('Accept the terms to start practicing.')
    this.name = 'ProfileRequiredError'
  }
}
