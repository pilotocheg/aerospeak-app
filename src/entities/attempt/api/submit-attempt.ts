import type { AttemptResultDto } from '@/shared/api'
import { API_URL } from '@/shared/config/env'

import { RateLimitedError, SttFailedError } from './attempt-errors'

export type SubmitAttemptInput = {
  guestId: string
  scenarioId: string
  stepId: string
  audio: Blob
}

const extensionFor = (mimeType: string) =>
  mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm'

/** Sends the recording to the backend, which transcribes and scores it. */
export const submitAttempt = async ({ guestId, scenarioId, stepId, audio }: SubmitAttemptInput) => {
  const form = new FormData()
  form.append('audio', audio, `attempt.${extensionFor(audio.type)}`)
  form.append('guestId', guestId)
  form.append('scenarioId', scenarioId)
  form.append('stepId', stepId)

  const response = await fetch(`${API_URL}/attempts`, { method: 'POST', body: form })

  if (response.status === 503) {
    throw new SttFailedError()
  }
  if (response.status === 429) {
    throw new RateLimitedError()
  }
  if (!response.ok) {
    throw new Error(`Scoring failed (${response.status})`)
  }

  const result = (await response.json()) as AttemptResultDto
  if (!result.transcript.trim()) {
    throw new SttFailedError()
  }
  return result
}
