import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { useScenarioProgress } from '@/entities/progress'
import type { ScenarioSummaryDto } from '@/shared/api'
import { ScoreRing } from '@/shared/ui/score-ring'

type ScenarioRowProps = {
  scenario: ScenarioSummaryDto
  sectionId: string
  index: number
  isSelected: boolean
}

export const ScenarioRow = ({ scenario, sectionId, index, isSelected }: ScenarioRowProps) => {
  const progress = useScenarioProgress(scenario.id)

  return (
    <Link
      to="/lessons/$sectionId"
      params={{ sectionId }}
      search={{ scenario: scenario.id }}
      className={cn(
        'flex items-center gap-3 border-l-2 py-3 pr-3 pl-4 transition',
        isSelected ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-muted/50',
      )}
    >
      <ScoreRing value={progress ? progress.bestScore : null} size={40} />
      <div className="min-w-0">
        <p className="text-sm font-medium">
          {index + 1}. {scenario.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{scenario.objective}</p>
      </div>
    </Link>
  )
}
