import { getAuthHeaders, type AttemptResultDto } from '@/shared/api'
import { API_URL } from '@/shared/config/env'

import { ProfileRequiredError, RateLimitedError, SttFailedError } from './attempt-errors'

export type SubmitAttemptInput = {
  scenarioId: string
  stepId: string
  /** Variant key of the scenario (`ScenarioDto.variant`), so the backend scores the same text. */
  variant?: string
  audio: Blob
}

const extensionFor = (mimeType: string) => {
  if (mimeType.includes('mp4')) return 'm4a'
  if (mimeType.includes('ogg')) return 'ogg'
  return 'webm'
}

/** Sends the recording to the backend, which transcribes and scores it. */
export const submitAttempt = async ({ scenarioId, stepId, variant, audio }: SubmitAttemptInput) => {
  const form = new FormData()
  form.append('audio', audio, `attempt.${extensionFor(audio.type)}`)
  form.append('scenarioId', scenarioId)
  form.append('stepId', stepId)
  if (variant) {
    form.append('variant', variant)
  }

  const response = await fetch(`${API_URL}/attempts`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: form,
  })

  if (response.status === 503) {
    throw new SttFailedError()
  }
  if (response.status === 403) {
    throw new ProfileRequiredError()
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
