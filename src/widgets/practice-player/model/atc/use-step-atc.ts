import { getAtcTransmission } from '@/entities/scenario'
import type { StepAttempt } from '@/features/practice-session'
import type { ScenarioStepDto } from '@/shared/api'
import type { AudioPlayer } from '@/shared/lib/audio'

import { useAtcPlayback } from './use-atc-playback'
import { useStepAtcAutoplay } from './use-step-atc-autoplay'

type UseStepAtcOptions = {
  player: AudioPlayer
  runId: number
  step: ScenarioStepDto
  lastAttempt: StepAttempt | undefined
}

export type StepAtc = {
  text: string | undefined
  hasAudio: boolean
  /** ATC's "negative, I say again" when the last readback missed a critical element. */
  correction: string | undefined
  isPlaying: boolean
  currentTime: number
  duration: number
  toggle: () => void
}

/** The ATC transmission in effect for the step (call or correction), autoplayed and toggleable. */
export const useStepAtc = ({ player, runId, step, lastAttempt }: UseStepAtcOptions): StepAtc => {
  const transmission = getAtcTransmission(step, lastAttempt?.result)
  const playback = useAtcPlayback(player, transmission.audio)
  useStepAtcAutoplay(player, runId, step.atcAudio)

  return {
    text: transmission.text,
    hasAudio: Boolean(transmission.audio),
    correction: transmission.isCorrection ? transmission.text : undefined,
    isPlaying: playback.isPlaying,
    currentTime: player.currentTime,
    duration: playback.duration,
    toggle: playback.toggle,
  }
}
