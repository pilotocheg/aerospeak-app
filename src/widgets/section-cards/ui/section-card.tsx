import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { SectionIcon } from '@/entities/section'
import { useSectionProgress } from '@/features/section-progress'
import type { Section } from '@/shared/content'
import { Button } from '@/shared/ui/button'
import { ScoreRing } from '@/shared/ui/score-ring'
import { Skeleton } from '@/shared/ui/skeleton'

type SectionCardProps = {
  section: Section
}

export const SectionCard = ({ section }: SectionCardProps) => {
  const { total, practiced, averageBest, isPending } = useSectionProgress(section.id)

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10',
        section.comingSoon && 'opacity-60',
      )}
    >
      <header
        className={cn(
          'flex items-center gap-3 px-4 py-3',
          section.comingSoon ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground',
        )}
      >
        <SectionIcon name={section.icon} className="size-5" />
        <h2 className="flex-1 font-semibold tracking-wide uppercase">{section.title}</h2>
        {!section.comingSoon &&
          (isPending ? (
            <Skeleton className="size-9 rounded-full bg-black/20" />
          ) : (
            <ScoreRing value={averageBest} size={36} className="rounded-full bg-black/20" />
          ))}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <p className="flex-1 text-sm text-muted-foreground">{section.description}</p>
        {section.comingSoon ? (
          <p className="text-center text-sm font-medium">Coming soon</p>
        ) : isPending ? (
          <>
            <div className="space-y-2">
              <Skeleton className="h-1.5 w-full rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-9 w-28 self-center" />
          </>
        ) : (
          <>
            <div className="space-y-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${total ? (practiced / total) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {practiced}/{total} scenarios
              </p>
            </div>
            <Button
              className="self-center px-8"
              render={<Link to="/lessons/$sectionId" params={{ sectionId: section.id }} search={{}} />}
            >
              {practiced ? 'Continue' : 'Start'}
            </Button>
          </>
        )}
      </div>
    </article>
  )
}
