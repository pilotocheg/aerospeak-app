import type { AttemptResultDto, ScenarioStepDto } from '@/shared/api'
import { API_URL } from '@/shared/config/env'
import { scoreTransmission } from '@/shared/lib/local-scoring'

import { RateLimitedError, ScenarioNotDeployedError, SttFailedError } from './attempt-errors'

export type AttemptResult = AttemptResultDto & {
  /** "server": backend STT + scoring; "local": dev fallback (browser STT + local engine). */
  source: 'server' | 'local'
}

export type SubmitAttemptInput = {
  guestId: string
  scenarioId: string
  step: ScenarioStepDto
  audio: Blob
  /** Set when the scenario is not deployed: use local scoring with this transcript. */
  localTranscript?: string | null
  scoreLocally: boolean
}

const extensionFor = (mimeType: string) =>
  mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm'

const scoreOnServer = async ({ guestId, scenarioId, step, audio }: SubmitAttemptInput): Promise<AttemptResult> => {
  const form = new FormData()
  form.append('audio', audio, `attempt.${extensionFor(audio.type)}`)
  form.append('guestId', guestId)
  form.append('scenarioId', scenarioId)
  form.append('stepId', step.id)

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
  return { ...result, source: 'server' }
}

const scoreInBrowser = ({ step, localTranscript }: SubmitAttemptInput): AttemptResult => {
  if (localTranscript === undefined || localTranscript === null) {
    throw new ScenarioNotDeployedError()
  }
  if (!localTranscript.trim()) {
    throw new SttFailedError()
  }

  const startedAt = performance.now()
  const { normalizedTranscript, elements, ...result } = scoreTransmission(step, {
    transcript: localTranscript,
  })

  return {
    ...result,
    attemptId: crypto.randomUUID(),
    transcript: localTranscript,
    expectedPilotResponse: step.expectedPilotResponse,
    elements: elements.map(({ position, ...element }) => element),
    feedbackProcessingMs: Math.round(performance.now() - startedAt),
    source: 'local',
  }
}

export const submitAttempt = async (input: SubmitAttemptInput) =>
  input.scoreLocally ? scoreInBrowser(input) : scoreOnServer(input)
