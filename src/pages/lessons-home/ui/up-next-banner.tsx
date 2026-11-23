import { Link } from '@tanstack/react-router'
import { Play } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'

type UpNextBannerProps = {
  packsIsPending: boolean
  practiced: number
  nextScenario: { id: string; title: string; objective: string; packId: string } | undefined
  section: { id: string; title: string } | undefined
}

/** The next scenario to practice: "Start here" before the first attempt, "Continue" after. */
export const UpNextBanner = ({ packsIsPending, practiced, nextScenario, section }: UpNextBannerProps) => {
  if (packsIsPending) {
    return <Skeleton className="h-28 rounded-xl" />
  }

  if (!nextScenario || !section) {
    return null
  }

  const { id, title, objective } = nextScenario
  const hasStarted = practiced > 0
  const label = hasStarted ? 'Continue' : 'Start here'
  const actionLabel = hasStarted ? 'Continue' : 'Start'

  return (
    <section
      aria-label="Next scenario"
      className="flex flex-col gap-4 rounded-xl bg-primary p-5 text-primary-foreground sm:flex-row sm:items-center"
    >
      <span className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-black/20 sm:flex">
        <Play className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wider uppercase opacity-80">
          {label} · {section.title}
        </p>
        <p className="truncate text-lg font-semibold">{title}</p>
        <p className="line-clamp-2 text-sm opacity-80">{objective}</p>
      </div>
      <Button
        variant="secondary"
        className="px-8"
        render={<Link to="/lessons/$sectionId" params={{ sectionId: section.id }} search={{ scenario: String(id) }} />}
      >
        {actionLabel}
      </Button>
    </section>
  )
}
