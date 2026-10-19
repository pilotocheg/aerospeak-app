import { useCallback, useEffect, useRef, useState } from 'react'

export type AudioPlayer = {
  playingSrc: string | null
  currentTime: number
  duration: number
  play: (src: string) => Promise<void>
  stop: () => void
}

/** One shared <audio> element: starting a clip stops the previous one. */
export const useAudioPlayer = (): AudioPlayer => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingSrc, setPlayingSrc] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onEnd = () => setPlayingSrc(null)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('error', onEnd)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('error', onEnd)
      audioRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    audioRef.current?.pause()
    setPlayingSrc(null)
  }, [])

  const play = useCallback(async (src: string) => {
    const audio = audioRef.current
    if (!audio) {
      return
    }
    audio.pause()
    audio.src = src
    audio.currentTime = 0
    setCurrentTime(0)
    setPlayingSrc(src)
    try {
      await audio.play()
    } catch {
      setPlayingSrc(null)
    }
  }, [])

  return { playingSrc, currentTime, duration, play, stop }
}
