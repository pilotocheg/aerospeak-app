import { humanizeMissedId, type MissedCount } from '../lib/helpers'
import { Progress } from '@/shared/ui/progress'

type MissedElementsProps = {
  items: MissedCount[]
}

export const MissedElements = ({ items }: MissedElementsProps) => {
  if (items.length === 0) return null
  const max = Math.max(1, ...items.map((item) => item.count))
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="truncate">{humanizeMissedId(item.id)}</span>
            <span className="tabular-nums text-muted-foreground">{item.count}</span>
          </div>
          <Progress value={Math.round((item.count / max) * 100)} />
        </div>
      ))}
    </div>
  )
}

