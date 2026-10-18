import { cn } from 'cn'
import { Loader2, Mic } from 'lucide-react'

import { formatTime } from '@/shared/lib/format-time'

import type { RecorderStatus } from '../lib/use-recorder'

type PttButtonProps = {
  status: RecorderStatus
  elapsedMs: number
  disabled?: boolean
  busy?: boolean
  onPress: () => void
  onRelease: () => void
}

export const PttButton = ({ status, elapsedMs, disabled, busy, onPress, onRelease }: PttButtonProps) => {
  const isRecording = status === 'recording' || status === 'starting'
  const isBusy = busy || status === 'processing'

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        aria-label="Hold to talk"
        aria-pressed={isRecording}
        disabled={disabled || isBusy}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          onPress()
        }}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
        onContextMenu={(event) => event.preventDefault()}
        className={cn(
          'flex size-14 touch-none items-center justify-center rounded-full text-white shadow-lg transition select-none [-webkit-touch-callout:none] disabled:opacity-50 sm:size-16',
          isRecording ? 'scale-110 bg-red-600 ring-4 ring-red-600/30' : 'bg-blue-600 hover:bg-blue-500',
        )}
      >
        {isBusy ? <Loader2 className="size-7 animate-spin" /> : <Mic className="size-7" />}
      </button>
      <span className={cn('text-xs tabular-nums', isRecording ? 'text-red-400' : 'text-muted-foreground')}>
        {isRecording ? formatTime(elapsedMs / 1000) : isBusy ? 'Scoring…' : 'Hold · Space'}
      </span>
    </div>
  )
}
