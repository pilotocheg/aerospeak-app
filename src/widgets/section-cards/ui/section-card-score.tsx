import type { SectionProgress } from '@/features/section-progress'
import { ScoreRing } from '@/shared/ui/score-ring'
import { Skeleton } from '@/shared/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

type SectionCardScoreProps = {
  progress: SectionProgress
}

const getScoreHint = (averageBest: number | null) =>
  averageBest === null
    ? 'No scores yet: practice a scenario to see your average'
    : `Average best score of practiced scenarios: ${averageBest}%`

export const SectionCardScore = ({ progress }: SectionCardScoreProps) => {
  const { isPending, averageBest } = progress

  if (isPending) {
    return <Skeleton className="size-9 rounded-full bg-black/20" />
  }

  const scoreHint = getScoreHint(averageBest)

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            tabIndex={0}
            role="img"
            aria-label={scoreHint}
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
          />
        }
      >
        <ScoreRing value={averageBest} size={36} className="rounded-full bg-black/20" />
      </TooltipTrigger>
      <TooltipContent>{scoreHint}</TooltipContent>
    </Tooltip>
  )
}
