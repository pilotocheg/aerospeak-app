import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ProfileRequiredError, SttFailedError, submitAttempt } from '@/entities/attempt'
import { getAtcTransmission } from '@/entities/scenario'
import { getUserProfileQueryOptions, meKeys } from '@/entities/user'
import { useUser } from '@/features/auth/model/selectors'
import { useAddAttempt } from '@/features/practice-session'
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

const toastError = (error: Error) =>
  error instanceof SttFailedError || error instanceof TooShortError
    ? toast.warning(error.message)
    : toast.error(error.message)

/**
 * Records a readback, sends it for scoring and stores the result. After a readback that missed a
 * critical element, ATC's correction plays right away.
 */
export const usePracticeAttempt = ({ scenario, step, player, onScored }: UsePracticeAttemptOptions) => {
  const queryClient = useQueryClient()
  const addAttempt = useAddAttempt()
  const user = useUser()
  // Recording needs a finished registration; TermsGate asks for it while the profile is missing.
  const { data: profile } = useQuery({ ...getUserProfileQueryOptions(user?.id ?? ''), enabled: Boolean(user) })

  const mutation = useMutation({
    mutationFn: submitAttempt,
    onError: (error) => {
      if (error instanceof ProfileRequiredError) {
        // The cached profile is out of date: refetching it brings back TermsGate.
        void queryClient.invalidateQueries({ queryKey: meKeys.all })
      }
      toastError(error)
    },
  })

  const submit = (recording: Recording) =>
    mutation.mutate(
      { scenarioId: scenario.id, stepId: step.id, variant: scenario.variant, audio: recording.blob },
      {
        onSuccess: (result) => {
          addAttempt(step.id, { result, recordingUrl: recording.url })
          onScored()
          const atc = getAtcTransmission(step, result)
          if (atc.isCorrection && atc.audio) {
            void player.play(atc.audio)
          }
        },
        onError: () => URL.revokeObjectURL(recording.url),
      },
    )

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
