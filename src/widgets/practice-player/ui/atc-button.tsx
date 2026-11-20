import { cn } from 'cn'
import { Square, Volume2 } from 'lucide-react'

import { formatTime } from '@/shared/lib/format-time'

type AtcButtonProps = {
  hasAudio: boolean
  isPlaying: boolean
  currentTime: number
  duration: number
  onToggle: () => void
}

const getStatusLabel = ({ hasAudio, isPlaying, currentTime, duration }: Omit<AtcButtonProps, 'onToggle'>) => {
  if (!hasAudio) return 'You call'
  if (isPlaying) return formatTime(currentTime)
  return duration ? formatTime(duration) : 'ATC'
}

export const AtcButton = ({ hasAudio, isPlaying, currentTime, duration, onToggle }: AtcButtonProps) => (
  <div className="flex flex-col items-center gap-1">
    <button
      type="button"
      aria-label={isPlaying ? 'Stop ATC audio' : 'Play ATC audio'}
      disabled={!hasAudio}
      onClick={onToggle}
      className={cn(
        'flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/80 disabled:opacity-30 sm:size-14',
        isPlaying && 'ring-4 ring-primary/30',
      )}
    >
      {isPlaying ? <Square className="size-5" /> : <Volume2 className="size-6" />}
    </button>
    <span className="text-xs text-muted-foreground tabular-nums">
      {getStatusLabel({ hasAudio, isPlaying, currentTime, duration })}
    </span>
  </div>
)
