import { cn } from 'cn'

import type { RecorderStatus } from '../model/use-recorder'
import { PttAnnouncement } from './ptt-announcement'
import { PttIcon } from './ptt-icon'
import { PttLabel } from './ptt-label'

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
        disabled={disabled || isBusy}
        onClick={onToggle}
        onContextMenu={(event) => event.preventDefault()}
        className={cn(
          'flex size-14 touch-manipulation items-center justify-center rounded-full text-white shadow-lg transition select-none [-webkit-touch-callout:none] disabled:opacity-50 sm:size-16',
          isRecording ? 'animate-pulse bg-red-600 ring-4 ring-red-600/30' : 'bg-primary hover:bg-primary/80',
        )}
      >
        <PttIcon isRecording={isRecording} isBusy={isBusy} />
      </button>
      <span className={cn('text-xs tabular-nums', isRecording ? 'text-red-400' : 'text-muted-foreground')}>
        <PttLabel isRecording={isRecording} isBusy={isBusy} disabled={disabled} elapsedMs={elapsedMs} />
      </span>
      <PttAnnouncement isRecording={isRecording} isBusy={isBusy} />
    </div>
  )
}
