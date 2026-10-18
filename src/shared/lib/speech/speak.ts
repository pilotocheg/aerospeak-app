import { toSpoken } from '@/shared/lib/phraseology'

/** Reads a phrase aloud with the browser TTS (used for "Hear expected response"). */
export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) {
    return
  }
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(toSpoken(text))
  utterance.lang = 'en-GB'
  utterance.rate = 0.95
  window.speechSynthesis.speak(utterance)
}

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
