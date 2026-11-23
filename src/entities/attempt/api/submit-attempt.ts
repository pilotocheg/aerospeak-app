import { apiClient, type CreateAttemptDto } from '@/shared/api'

import { ProfileRequiredError, RateLimitedError, SttFailedError } from './attempt-errors'

export type SubmitAttemptInput = {
  scenarioId: string
  stepId: string
  /** One pass through the scenario: the same id for every attempt of that run. */
  sessionId?: string
  /** Variant key of the scenario (`ScenarioDto.variant`), so the backend scores the same text. */
  variant?: string
  audio: Blob
}

/** Errors the backend answers with instead of a result, by status. */
const ERROR_BY_STATUS: Record<number, () => Error> = {
  403: () => new ProfileRequiredError(),
  429: () => new RateLimitedError(),
  503: () => new SttFailedError(),
}

const extensionFor = (mimeType: string) => {
  if (mimeType.includes('mp4')) return 'm4a'
  if (mimeType.includes('ogg')) return 'ogg'
  return 'webm'
}

/** multipart/form-data with a file name, so the backend can tell the audio format. */
const toAttemptFormData = ({ audio, scenarioId, stepId, sessionId, variant }: CreateAttemptDto) => {
  const form = new FormData()
  const fileName = `attempt.${extensionFor(audio.type)}`
  form.append('audio', audio, fileName)
  form.append('scenarioId', scenarioId)
  form.append('stepId', stepId)
  if (sessionId) {
    form.append('sessionId', sessionId)
  }
  if (variant) {
    form.append('variant', variant)
  }
  return form
}

/** Sends the recording to the backend, which transcribes and scores it. */
export const submitAttempt = async ({ scenarioId, stepId, sessionId, variant, audio }: SubmitAttemptInput) => {
  const { data: result, response } = await apiClient.POST('/attempts', {
    body: { audio, scenarioId, stepId, sessionId, variant },
    bodySerializer: toAttemptFormData,
  })

  const { status } = response
  const createError = ERROR_BY_STATUS[status]
  if (createError) {
    throw createError()
  }
  if (!result) {
    throw new Error(`Scoring failed (${status})`)
  }
  if (!result.transcript.trim()) {
    throw new SttFailedError()
  }
  return result
}
