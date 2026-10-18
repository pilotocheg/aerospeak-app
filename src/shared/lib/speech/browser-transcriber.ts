type RecognitionResultEvent = Event & {
  resultIndex: number
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>
}

type Recognition = EventTarget & {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: RecognitionResultEvent) => void) | null
  onend: (() => void) | null
  onerror: ((event: Event) => void) | null
}

type RecognitionConstructor = new () => Recognition

const getRecognitionConstructor = (): RecognitionConstructor | null => {
  const scope = window as unknown as {
    SpeechRecognition?: RecognitionConstructor
    webkitSpeechRecognition?: RecognitionConstructor
  }
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition ?? null
}

export const isBrowserTranscriptionSupported = () => getRecognitionConstructor() !== null

export type BrowserTranscriber = {
  /** Stops listening and resolves with the final transcript (empty string if nothing was heard). */
  stop: () => Promise<string>
  abort: () => void
}

/**
 * Starts Web Speech API recognition alongside the recorder. Dev fallback only
 * (see LOCAL_SCORING_FALLBACK): the browser sends this audio to its own STT service.
 */
export const startBrowserTranscriber = (): BrowserTranscriber | null => {
  const Constructor = getRecognitionConstructor()
  if (!Constructor) {
    return null
  }

  const recognition = new Constructor()
  recognition.lang = 'en-US'
  recognition.continuous = true
  recognition.interimResults = false

  const finals: string[] = []
  let resolveEnd: (() => void) | null = null
  const ended = new Promise<void>((resolve) => {
    resolveEnd = resolve
  })

  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i]
      if (result.isFinal) {
        finals.push(result[0].transcript)
      }
    }
  }
  recognition.onend = () => resolveEnd?.()
  recognition.onerror = () => resolveEnd?.()
  try {
    recognition.start()
  } catch {
    return null
  }

  return {
    stop: async () => {
      recognition.stop()
      // Final results arrive shortly after stop(); do not wait forever.
      await Promise.race([ended, new Promise((resolve) => setTimeout(resolve, 2500))])
      return finals.join(' ').trim()
    },
    abort: () => recognition.abort(),
  }
}
