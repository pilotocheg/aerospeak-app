import { ChevronRight } from 'lucide-react'
import { cn } from 'cn'

import { usePracticedStats } from '@/entities/progress'
import { useUserId } from '@/features/auth'
import type { PracticePackDto } from '@/shared/api'

import { ScenarioRow } from './scenario-row'

type PackSectionProps = {
  pack: PracticePackDto
  sectionId: string
  isOpen: boolean
  selectedScenarioId?: string
  onToggle: () => void
}

export const PackSection = ({ pack, sectionId, isOpen, selectedScenarioId, onToggle }: PackSectionProps) => {
  const uid = useUserId()
  const { title, scenarios, recommendedForBeginners } = pack
  const scenarioIds = scenarios.map(({ id }) => id)
  const { practiced, total: scenarioCount, isPending, isError } = usePracticedStats(uid, scenarioIds)
  const hasProgress = !isPending && !isError
  const countText = hasProgress ? `${practiced}/${scenarioCount} practiced` : `${scenarioCount} scenarios`

  return (
    <section className="border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 bg-card px-4 py-3 text-left transition hover:bg-muted/50"
      >
        <ChevronRight className={cn('size-4 shrink-0 text-brand transition-transform', isOpen && 'rotate-90')} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{scenarioCount ? countText : 'Coming soon'}</p>
        </div>
        {recommendedForBeginners && (
          <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-brand uppercase">
            Start here
          </span>
        )}
      </button>

      {isOpen && scenarioCount > 0 && (
        <div className="bg-background">
          {scenarios.map((scenario, index) => (
            <ScenarioRow
              key={scenario.id}
              scenario={scenario}
              sectionId={sectionId}
              index={index}
              isSelected={scenario.id === selectedScenarioId}
            />
          ))}
        </div>
      )}
    </section>
  )
}
