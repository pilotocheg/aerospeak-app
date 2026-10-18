import { Link } from '@tanstack/react-router'
import { CircleHelp, X } from 'lucide-react'

import { Button } from '@/shared/ui/button'

type PracticeHeaderProps = {
  scenarioId: string
  title: string
  stepIndex: number
  stepCount: number
  onHelp: () => void
}

export const PracticeHeader = ({ scenarioId, title, stepIndex, stepCount, onHelp }: PracticeHeaderProps) => (
  <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-3">
    <Button
      variant="ghost"
      size="icon"
      aria-label="Close practice"
      render={<Link to="/" search={{ scenario: scenarioId }} />}
    >
      <X />
    </Button>
    <div className="min-w-0 flex-1 text-center">
      <p className="truncate font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">
        Transmission {stepIndex + 1} of {stepCount}
      </p>
    </div>
    <Button variant="ghost" size="icon" aria-label="Help" onClick={onHelp}>
      <CircleHelp />
    </Button>
  </header>
)
