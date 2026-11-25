import { Link } from '@tanstack/react-router'

import { SectionIcon } from '@/entities/section'
import type { ScenarioSummaryDto } from '@/shared/api'
import type { Section } from '@/shared/content'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'

type UpNextBannerProps = {
  isPending: boolean
  /** Without the account progress the next scenario is unknown: no banner. */
  isError: boolean
  practiced: number
  nextScenario: ScenarioSummaryDto | undefined
  section: Section | undefined
}

/** The next scenario to practice: "Start here" before the first attempt, "Continue" after. */
export const UpNextBanner = ({ isPending, isError, practiced, nextScenario, section }: UpNextBannerProps) => {
  if (isPending) {
    return <Skeleton className="h-28 rounded-xl" />
  }

  if (isError || !nextScenario || !section) {
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
        <SectionIcon name={section.icon} className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wider uppercase opacity-80">
          {label} · {section.title}
        </p>
        <p className="truncate text-lg font-semibold">{title}</p>
        <p className="line-clamp-2 text-sm opacity-80">{objective}</p>
      </div>
      <Button
        className="bg-primary-foreground px-8 text-primary hover:bg-primary-foreground/90"
        render={<Link to="/lessons/$sectionId" params={{ sectionId: section.id }} search={{ scenario: id }} />}
      >
        {actionLabel}
      </Button>
    </section>
  )
}
