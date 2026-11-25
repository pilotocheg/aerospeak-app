import { Link } from '@tanstack/react-router'

import type { SectionProgress } from '@/features/section-progress'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
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
        <Skeleton className="h-9 w-28 self-end" />
      </>
    )
  }

  const { completionPercent, practiced, total, isError } = progress
  const openButton = (label: string) => (
    <Button className="self-end px-8" render={<Link to="/lessons/$sectionId" params={{ sectionId }} />}>
      {label}
    </Button>
  )

  if (isError) {
    return (
      <>
        <p className="text-xs text-muted-foreground">Progress unavailable</p>
        {openButton('Open')}
      </>
    )
  }

  const progressText = `${practiced} of ${total} scenarios practiced`

  return (
    <>
      <div className="space-y-1">
        <Progress value={completionPercent} aria-label="Section progress" getAriaValueText={() => progressText} />
        <p className="text-xs tracking-wide text-muted-foreground uppercase" aria-hidden>
          {practiced}/{total} scenarios
        </p>
      </div>
      {openButton(practiced ? 'Continue' : 'Start')}
    </>
  )
}
