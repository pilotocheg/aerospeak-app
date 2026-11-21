import { cn } from 'cn'

import { SectionIcon } from '@/entities/section'
import { useSectionProgress } from '@/features/section-progress'
import type { Section } from '@/shared/content'

import { SectionCardProgress } from './section-card-progress'
import { SectionCardScore } from './section-card-score'

type SectionCardProps = {
  section: Section
}

export const SectionCard = ({ section }: SectionCardProps) => {
  const progress = useSectionProgress(section.id)

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
        {!section.comingSoon && <SectionCardScore progress={progress} />}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <p className="flex-1 text-sm text-muted-foreground">{section.description}</p>
        {section.comingSoon ? (
          <p className="text-center text-sm font-medium">Coming soon</p>
        ) : (
          <SectionCardProgress sectionId={section.id} progress={progress} />
        )}
      </div>
    </article>
  )
}
