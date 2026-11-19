import type { AudioPlayer } from '@/shared/lib/audio'

/** Play/stop state of one ATC transmission on the shared player. */
export const useAtcPlayback = (player: AudioPlayer, audio: string | undefined) => {
  const isPlaying = Boolean(audio) && player.playingSrc === audio

  const toggle = () => {
    if (!audio) {
      return
    }
    if (isPlaying) {
      player.stop()
    } else {
      void player.play(audio)
    }
  }

  return { isPlaying, duration: isPlaying ? player.duration : 0, toggle }
}
