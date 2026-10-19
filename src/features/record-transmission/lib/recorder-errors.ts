export class MicrophoneError extends Error {
  constructor() {
    super('Microphone is blocked. Allow microphone access in the browser to record.')
    this.name = 'MicrophoneError'
  }
}

export class TooShortError extends Error {
  constructor() {
    super('Recording too short. Speak for at least a second, then tap again to stop.')
    this.name = 'TooShortError'
  }
}
