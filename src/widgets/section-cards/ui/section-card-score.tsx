import type { SectionProgress } from '@/features/section-progress'
import { ScoreRing } from '@/shared/ui/score-ring'
import { Skeleton } from '@/shared/ui/skeleton'

type SectionCardScoreProps = {
  progress: SectionProgress
}

export const SectionCardScore = ({ progress }: SectionCardScoreProps) =>
  progress.isPending ? (
    <Skeleton className="size-9 rounded-full bg-black/20" />
  ) : (
    <ScoreRing value={progress.averageBest} size={36} className="rounded-full bg-black/20" />
  )
