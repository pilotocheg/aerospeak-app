import { Link } from '@tanstack/react-router'

import type { SectionProgress } from '@/features/section-progress'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'

type SectionCardProgressProps = {
  sectionId: string
  progress: SectionProgress
}

/** Progress bar and the start / continue button of an open section. */
export const SectionCardProgress = ({ sectionId, progress }: SectionCardProgressProps) => {
  if (progress.isPending) {
    return (
      <>
        <div className="space-y-2">
          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-9 w-28 self-center" />
      </>
    )
  }

  return (
    <>
      <div className="space-y-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress.completionPercent}%` }} />
        </div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {progress.practiced}/{progress.total} scenarios
        </p>
      </div>
      <Button
        className="self-center px-8"
        render={<Link to="/lessons/$sectionId" params={{ sectionId }} search={{}} />}
      >
        {progress.practiced ? 'Continue' : 'Start'}
      </Button>
    </>
  )
}
