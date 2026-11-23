import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { useScenarioProgress } from '@/entities/progress'
import { DifficultyBadge, useRandomScenarioVariant } from '@/entities/scenario'
import { formatDuration } from '@/shared/lib/format'
import { roundedAverage } from '@/shared/lib/math'
import { Button } from '@/shared/ui/button'
import { ScoreRing } from '@/shared/ui/score-ring'
import { SectionTitle } from '@/shared/ui/section-title'

import { LessonOverview } from './lesson-overview'
import { ScenarioDetailsSkeleton } from './scenario-details-skeleton'
import { Stat } from './stat'

type ScenarioDetailsProps = {
  sectionId: string
  scenarioId: string
}

export const ScenarioDetails = ({ sectionId, scenarioId }: ScenarioDetailsProps) => {
  // Each visit picks one variant (aerodrome, weather, aircraft); practice runs the same one.
  const { scenario, isPending, isError } = useRandomScenarioVariant(scenarioId)
  const progress = useScenarioProgress(scenarioId)

  if (isPending) {
    return <ScenarioDetailsSkeleton />
  }

  if (isError || !scenario) {
    return <div className="flex flex-1 items-center justify-center text-muted-foreground">Scenario not found.</div>
  }

  const { id, title, difficulty, estimatedDurationSec, objective, steps, briefing, phraseologyNote, variant } = scenario
  const stepCount = steps.length
  const transmissionsLabel = stepCount === 1 ? 'transmission' : 'transmissions'
  const averageScore = roundedAverage(progress?.scores ?? [])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b bg-card px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            render={<Link to="/lessons/$sectionId" params={{ sectionId }} />}
            aria-label="Back to scenarios"
          >
            <ArrowLeft />
          </Button>
          <h1 className="flex-1 truncate text-lg font-semibold">{title}</h1>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Stat label="Attempts">
            <ScoreRing value={null} label={String(progress?.attempts ?? 0)} size={56} />
          </Stat>
          <Stat label="Duration">
            <span className="text-lg font-semibold">{formatDuration(estimatedDurationSec)}</span>
          </Stat>
          <Stat label="Avg score">
            <ScoreRing value={averageScore} size={56} />
          </Stat>
          <Stat label="Best score">
            <ScoreRing value={progress?.bestScore ?? null} size={56} />
          </Stat>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">
        <section className="space-y-1">
          <SectionTitle as="h2">Objective</SectionTitle>
          <p>{objective}</p>
          <p className="text-sm text-muted-foreground">
            {stepCount} {transmissionsLabel}
          </p>
        </section>

        {briefing?.length ? (
          <section className="space-y-2">
            <SectionTitle as="h2">Briefing</SectionTitle>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg border bg-card p-4 text-sm sm:grid-cols-3">
              {briefing.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <LessonOverview note={phraseologyNote} />
      </div>

      <div className="border-t bg-card p-4">
        <Button
          size="lg"
          className="mx-auto flex w-full max-w-sm"
          render={<Link to="/practice/$scenarioId" params={{ scenarioId: id }} search={variant ? { variant } : {}} />}
        >
          Start practice
        </Button>
      </div>
    </div>
  )
}
