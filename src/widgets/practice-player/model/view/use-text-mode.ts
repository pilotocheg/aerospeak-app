import { useState } from 'react'

export type TextMode = 'prompt' | 'atc' | 'response'

/** Which line the transcript shows: the prompt, or the ATC / expected response text. */
export const useTextMode = () => {
  const [textMode, setTextMode] = useState<TextMode>('prompt')

  /** Shows the mode's text, or the prompt again when it is already shown. */
  const toggleTextMode = (mode: TextMode) => {
    setTextMode((current) => (current === mode ? 'prompt' : mode))
  }

  const resetTextMode = () => setTextMode('prompt')

  return { textMode, toggleTextMode, resetTextMode }
}
