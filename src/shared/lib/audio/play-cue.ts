export type CueKind = 'start' | 'stop'

// Short two-tone beeps, like a PTT radio: rising when the mic opens, falling when it closes.
const CUES: Record<CueKind, number[]> = {
  start: [880, 1320],
  stop: [1320, 880],
}
const TONE_S = 0.07
const GAIN = 0.15

let context: AudioContext | null = null

/** Plays a record start/stop cue through Web Audio (no files to load). Never throws. */
export const playCue = (kind: CueKind) => {
  try {
    context ??= new AudioContext()
    if (context.state === 'suspended') {
      void context.resume()
    }
    const startAt = context.currentTime + 0.01
    CUES[kind].forEach((frequency, index) => {
      const at = startAt + index * TONE_S
      const oscillator = context!.createOscillator()
      const gain = context!.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      // Short ramps avoid clicks at the tone edges.
      gain.gain.setValueAtTime(0, at)
      gain.gain.linearRampToValueAtTime(GAIN, at + 0.005)
      gain.gain.setValueAtTime(GAIN, at + TONE_S - 0.01)
      gain.gain.linearRampToValueAtTime(0, at + TONE_S)
      oscillator.connect(gain).connect(context!.destination)
      oscillator.start(at)
      oscillator.stop(at + TONE_S)
    })
  } catch {
    // No Web Audio: recording works without the cue.
  }
}
