import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ProfileRequiredError, SttFailedError, submitAttempt } from '@/entities/attempt'
import { progressKeys } from '@/entities/progress'
import { getAtcTransmission } from '@/entities/scenario'
import { meKeys } from '@/entities/user'
import { useCurrentUserProfile } from '@/features/auth'
import { useAddAttempt, usePracticeSessionId } from '@/features/practice-session'
import { TooShortError, useRecorder, type Recording } from '@/features/record-transmission'
import type { ScenarioDto, ScenarioStepDto } from '@/shared/api'
import type { AudioPlayer } from '@/shared/lib/audio'
import { stopSpeaking } from '@/shared/lib/speech'

type UsePracticeAttemptOptions = {
  scenario: ScenarioDto
  step: ScenarioStepDto
  player: AudioPlayer
  /** Called once the attempt is scored and stored, e.g. to open the feedback. */
  onScored: () => void
}

const toastError = (error: Error) => {
  // Not the user's fault (nothing heard, too short): a warning, not an error.
  const isRetryable = error instanceof SttFailedError || error instanceof TooShortError
  if (isRetryable) {
    toast.warning(error.message)
  } else {
    toast.error(error.message)
  }
}

/**
 * Records a readback, sends it for scoring and stores the result. After a readback that missed a
 * critical element, ATC's correction plays right away.
 */
export const usePracticeAttempt = ({ scenario, step, player, onScored }: UsePracticeAttemptOptions) => {
  const queryClient = useQueryClient()
  const addAttempt = useAddAttempt()
  const practiceSessionId = usePracticeSessionId() ?? undefined
  // Recording needs a finished registration; TermsGate asks for it while the profile is missing.
  const { data: profile } = useCurrentUserProfile()

  const mutation = useMutation({
    mutationFn: submitAttempt,
    onSuccess: () => {
      // The scored attempt may complete the run even if the user never presses Finish: mark progress
      // stale so home refetches it on the next visit, without a request per attempt now.
      void queryClient.invalidateQueries({ queryKey: progressKeys.all, refetchType: 'none' })
    },
    onError: (error) => {
      if (error instanceof ProfileRequiredError) {
        // The cached profile is out of date: refetching it brings back TermsGate.
        void queryClient.invalidateQueries({ queryKey: meKeys.all })
      }
      toastError(error)
    },
  })

  const submit = (recording: Recording) => {
    const { blob, url } = recording
    const attempt = {
      scenarioId: scenario.id,
      stepId: step.id,
      practiceSessionId,
      variant: scenario.variant,
      audio: blob,
    }

    mutation.mutate(attempt, {
      onSuccess: (result) => {
        addAttempt(step.id, { result, recordingUrl: url })
        onScored()
        const { isCorrection, audio } = getAtcTransmission(step, result)
        if (isCorrection && audio) {
          void player.play(audio)
        }
      },
      onError: () => URL.revokeObjectURL(url),
    })
  }

  const recorder = useRecorder({ onRecorded: submit, onError: toastError })
  const canRecord = Boolean(profile?.termsAcceptedAt) && !mutation.isPending

  /** Starts recording (silencing ATC) or stops it, which sends the attempt. */
  const toggleRecording = () => {
    const isStarting = recorder.status === 'idle'
    if (isStarting && !canRecord) {
      return
    }
    if (isStarting) {
      player.stop()
      stopSpeaking()
    }
    recorder.toggle()
  }

  return {
    recorder,
    canRecord,
    isSubmitting: mutation.isPending,
    toggleRecording,
  }
}
