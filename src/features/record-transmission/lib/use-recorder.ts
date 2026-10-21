import { useEffect, useRef, useState } from 'react'

import { MicrophoneError, TooShortError } from './recorder-errors'

export type Recording = {
  blob: Blob
  url: string
  durationMs: number
}

export type RecorderStatus = 'idle' | 'starting' | 'recording' | 'processing'

type UseRecorderOptions = {
  maxDurationMs?: number
  onRecorded: (recording: Recording) => void
  onError: (error: Error) => void
}

const MIN_DURATION_MS = 1000

// Chrome/Firefox record webm/opus, Safari only mp4/aac. The backend accepts both.
const pickMimeType = () =>
  ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].find((type) =>
    MediaRecorder.isTypeSupported(type),
  )

export const useRecorder = ({ maxDurationMs = 120_000, onRecorded, onError }: UseRecorderOptions) => {
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [elapsedMs, setElapsedMs] = useState(0)

  const statusRef = useRef<RecorderStatus>('idle')
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<number | null>(null)
  const releasedEarlyRef = useRef(false)

  const updateStatus = (next: RecorderStatus) => {
    statusRef.current = next
    setStatus(next)
  }

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(
    () => () => {
      clearTimer()
      if (recorderRef.current?.state === 'recording') {
        recorderRef.current.onstop = null
        recorderRef.current.stop()
      }
      streamRef.current?.getTracks().forEach((track) => track.stop())
    },
    [],
  )

  const stop = () => {
    if (statusRef.current === 'starting') {
      releasedEarlyRef.current = true
      return
    }
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop()
    }
  }

  const start = async () => {
    if (statusRef.current !== 'idle') {
      return
    }
    updateStatus('starting')
    releasedEarlyRef.current = false

    try {
      streamRef.current ??= await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      })
    } catch {
      updateStatus('idle')
      onError(new MicrophoneError())
      return
    }

    const mimeType = pickMimeType()
    let recorder: MediaRecorder
    try {
      recorder = new MediaRecorder(streamRef.current, mimeType ? { mimeType } : undefined)
    } catch {
      updateStatus('idle')
      onError(new MicrophoneError())
      return
    }
    const chunks: Blob[] = []
    const startedAt = Date.now()

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data)
      }
    }

    recorder.onstop = () => {
      clearTimer()
      updateStatus('processing')
      const durationMs = Date.now() - startedAt
      const blob = new Blob(chunks, { type: recorder.mimeType })
      setElapsedMs(0)
      updateStatus('idle')

      if (durationMs < MIN_DURATION_MS || blob.size === 0) {
        onError(new TooShortError())
        return
      }
      onRecorded({ blob, url: URL.createObjectURL(blob), durationMs })
    }

    recorderRef.current = recorder
    try {
      recorder.start()
    } catch {
      updateStatus('idle')
      onError(new MicrophoneError())
      return
    }
    updateStatus('recording')

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      setElapsedMs(elapsed)
      if (elapsed >= maxDurationMs && recorder.state === 'recording') {
        recorder.stop()
      }
    }, 100)

    if (releasedEarlyRef.current) {
      recorder.stop()
    }
  }

  /** Starts recording when idle, stops it when recording. */
  const toggle = () => {
    if (statusRef.current === 'idle') {
      start()
    } else {
      stop()
    }
  }

  return { status, elapsedMs, start, stop, toggle }
}
