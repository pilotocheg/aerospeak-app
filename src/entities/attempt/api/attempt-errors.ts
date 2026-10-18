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

/** The scenario is only in content/ and the browser cannot transcribe locally. */
export class ScenarioNotDeployedError extends Error {
  constructor() {
    super('This scenario is not on the server yet. Try it in Chrome to use local scoring.')
    this.name = 'ScenarioNotDeployedError'
  }
}
