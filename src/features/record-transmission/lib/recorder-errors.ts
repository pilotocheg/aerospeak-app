export class MicrophoneError extends Error {
  constructor() {
    super('Microphone is blocked. Allow microphone access in the browser to record.')
    this.name = 'MicrophoneError'
  }
}

export class TooShortError extends Error {
  constructor() {
    super('Hold the button (or Space) while you speak, then release.')
    this.name = 'TooShortError'
  }
}
