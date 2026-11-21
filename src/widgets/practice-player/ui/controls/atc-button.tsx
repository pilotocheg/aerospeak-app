import { cn } from 'cn'
import { Square, Volume2 } from 'lucide-react'

import { formatTime } from '@/shared/lib/format'

import type { StepAtc } from '../../model/atc/use-step-atc'

type AtcButtonProps = {
  atc: Pick<StepAtc, 'hasAudio' | 'isPlaying' | 'currentTime' | 'duration' | 'toggle'>
}

const getStatusLabel = ({ hasAudio, isPlaying, currentTime, duration }: AtcButtonProps['atc']) => {
  if (!hasAudio) return 'You call'
  if (isPlaying) return formatTime(currentTime)
  return duration ? formatTime(duration) : 'ATC'
}

export const AtcButton = ({ atc }: AtcButtonProps) => {
  const { hasAudio, isPlaying, toggle } = atc
  const statusLabel = getStatusLabel(atc)

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        aria-label={isPlaying ? 'Stop ATC audio' : 'Play ATC audio'}
        disabled={!hasAudio}
        onClick={toggle}
        className={cn(
          'flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/80 disabled:opacity-30 sm:size-14',
          isPlaying && 'ring-4 ring-primary/30',
        )}
      >
        {isPlaying ? <Square className="size-5" /> : <Volume2 className="size-6" />}
      </button>
      <span className="text-xs text-muted-foreground tabular-nums">{statusLabel}</span>
    </div>
  )
}
