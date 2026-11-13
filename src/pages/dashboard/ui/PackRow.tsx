import { ChevronDown } from 'lucide-react'
import { cn } from 'cn'
import { Link } from '@tanstack/react-router'

import { findSectionByPackId } from '@/entities/section'
import type { PracticePackDto } from '@/shared/api'
import type { ScenarioProgressDto } from '@/shared/api'

import { Button } from '@/shared/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible'
import { Progress } from '@/shared/ui/progress'

type PackRowProps = {
  pack: PracticePackDto
  progressMap: Map<string, ScenarioProgressDto>
  isOpen: boolean
  onToggle: (open: boolean) => void
}

const practicedCount = (pack: PracticePackDto, progressMap: Map<string, ScenarioProgressDto>) =>
  pack.scenarios.filter((scenario) => (progressMap.get(scenario.id)?.runs ?? 0) >= 1).length

export const PackRow = ({ pack, progressMap, isOpen, onToggle }: PackRowProps) => {
  const done = practicedCount(pack, progressMap)
  const total = pack.scenarios.length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0
  const sectionId = findSectionByPackId(pack.id)?.id

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle} className="rounded-xl border bg-card">
      <CollapsibleTrigger
        aria-expanded={isOpen}
        className="flex min-h-16 w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-muted/50"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[17px] font-bold">{pack.title}</span>
            {pack.recommendedForBeginners && (
              <span className="rounded-md border border-border px-2 py-0.5 text-xs font-medium">
                Start here
              </span>
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">{pack.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm tabular-nums text-muted-foreground">
            {done}/{total}
          </span>
          <Progress value={percent} className="w-30" />
          <ChevronDown
            className={cn('size-4 text-muted-foreground transition-transform motion-reduce:transition-none', isOpen && 'rotate-180')}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="border-t px-4 py-3">
        <div className="space-y-2">
          {pack.scenarios.slice(0, 4).map((scenario) => {
            const row = progressMap.get(scenario.id)
            const best = row?.bestScore ?? null
            const practiced = (row?.runs ?? 0) >= 1
            const minutes = Math.max(1, Math.round(scenario.estimatedDurationSec / 60))
            return (
              <div key={scenario.id} className="flex items-center gap-3 rounded-lg border p-2">
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-lg text-xs font-bold tabular-nums',
                    !practiced && 'border border-border bg-muted text-muted-foreground',
                    practiced && best !== null && best >= 60 && 'bg-primary text-primary-foreground',
                    practiced && (best === null || best < 60) && 'border border-destructive bg-muted text-destructive',
                  )}
                >
                  {practiced && best !== null ? best : '–'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{scenario.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {scenario.difficulty} · {minutes} min
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link to="/practice/$scenarioId" params={{ scenarioId: scenario.id }} />}
                >
                  Practice
                </Button>
              </div>
            )
          })}
        </div>
        {pack.scenarios.length > 4 && (
          <p className="mt-3 text-sm text-muted-foreground">+ {pack.scenarios.length - 4} more scenarios</p>
        )}
        <div className="mt-3">
          {sectionId ? (
            <Button
              variant="outline"
              size="sm"
              render={<Link to="/lessons/$sectionId" params={{ sectionId }} />}
            >
              Open pack
            </Button>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

