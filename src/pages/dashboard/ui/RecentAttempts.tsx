import type { AttemptHistoryItemDto } from '@/shared/api'
import { Badge } from '@/shared/ui/badge'


type RecentAttemptsProps = {
  attempts: AttemptHistoryItemDto[]
  scenarioTitle: (id: string) => string
  packTitle: (scenarioId: string) => string
}

const relativeTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export const RecentAttempts = ({ attempts, scenarioTitle, packTitle }: RecentAttemptsProps) => {
  const items = attempts.slice(0, 5)
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No attempts yet. Start speaking to see your history.</p>
  }
  return (
    <div className="space-y-3">
      {items.map((attempt) => (
        <div key={attempt.id} className="flex items-center gap-3">
          <Badge
            className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground tabular-nums"
          >
            {attempt.displayScore}
          </Badge>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{attempt.transcript}</p>
            <p className="truncate text-xs text-muted-foreground">
              {packTitle(attempt.scenarioId) ? `${packTitle(attempt.scenarioId)} · ` : ''}
              {scenarioTitle(attempt.scenarioId)} · {relativeTime(attempt.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
