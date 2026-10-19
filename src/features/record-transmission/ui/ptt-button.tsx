import { cn } from 'cn'
import { Loader2, Mic, Square } from 'lucide-react'

import { formatTime } from '@/shared/lib/format-time'

import type { RecorderStatus } from '../lib/use-recorder'

type PttButtonProps = {
  status: RecorderStatus
  elapsedMs: number
  disabled?: boolean
  busy?: boolean
  onToggle: () => void
}

export const PttButton = ({ status, elapsedMs, disabled, busy, onToggle }: PttButtonProps) => {
  const isRecording = status === 'recording' || status === 'starting'
  const isBusy = busy || status === 'processing'

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        aria-pressed={isRecording}
        disabled={disabled || isBusy}
        onClick={onToggle}
        onContextMenu={(event) => event.preventDefault()}
        className={cn(
          'flex size-14 touch-manipulation items-center justify-center rounded-full text-white shadow-lg transition select-none [-webkit-touch-callout:none] disabled:opacity-50 sm:size-16',
          isRecording ? 'animate-pulse bg-red-600 ring-4 ring-red-600/30' : 'bg-primary hover:bg-primary/80',
        )}
      >
        {isBusy ? (
          <Loader2 className="size-7 animate-spin" />
        ) : isRecording ? (
          <Square className="size-6" />
        ) : (
          <Mic className="size-7" />
        )}
      </button>
      <span className={cn('text-xs tabular-nums', isRecording ? 'text-red-400' : 'text-muted-foreground')}>
        {isRecording ? (
          formatTime(elapsedMs / 1000)
        ) : isBusy ? (
          'Scoring…'
        ) : disabled ? (
          'Connecting…'
        ) : (
          <>
            Tap<span className="hidden sm:inline"> · Space</span>
          </>
        )}
      </span>
    </div>
  )
}
