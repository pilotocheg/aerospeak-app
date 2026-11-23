import { beforeEach, describe, expect, it, vi } from 'vitest'

import { buildAttemptResult } from '@tests/builders'

import { submitAttempt } from '@/entities/attempt/api/submit-attempt'
import { apiClient } from '@/shared/api'

vi.mock('@/shared/api', () => ({ apiClient: { POST: vi.fn() } }))

const SESSION_ID = '6f1c2b8e-3d4a-4f5b-9c6d-7e8f9a0b1c2d'

/** The multipart body submitAttempt sends, as the bodySerializer builds it. */
const sentFormData = (): FormData => {
  const [, options] = vi.mocked(apiClient.POST).mock.calls[0]
  const { body, bodySerializer } = options as { body: unknown; bodySerializer: (body: unknown) => FormData }
  return bodySerializer(body)
}

describe('submitAttempt', () => {
  beforeEach(() => {
    vi.mocked(apiClient.POST).mockReset()
    vi.mocked(apiClient.POST).mockResolvedValue({
      data: buildAttemptResult(),
      response: new Response(null, { status: 201 }),
    } as never)
  })

  it('sends the session id of the run, so the backend can count the scenario as practiced', async () => {
    const audio = new Blob(['audio'], { type: 'audio/webm' })

    await submitAttempt({ scenarioId: 'ground-ctrl-taxi-clearance', stepId: 'taxi', sessionId: SESSION_ID, audio })

    expect(sentFormData().get('sessionId')).toBe(SESSION_ID)
  })
})
