import { useEffect } from 'react'

import type { AudioPlayer } from '@/shared/lib/audio'

/** Plays the step's ATC call when the step (or a new run) starts. */
export const useStepAtcAutoplay = (player: AudioPlayer, runId: number, stepAudio: string | undefined) => {
  const { play, stop } = player
  useEffect(() => {
    if (stepAudio) {
      void play(stepAudio)
    } else {
      stop()
    }
  }, [runId, stepAudio, play, stop])
}
