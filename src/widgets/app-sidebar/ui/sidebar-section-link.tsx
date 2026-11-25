import { Link } from '@tanstack/react-router'

import { SectionIcon } from '@/entities/section'
import { useUserId } from '@/features/auth'
import { useSectionProgress } from '@/features/section-progress'
import type { Section } from '@/shared/content'
import { Progress } from '@/shared/ui/progress'

type SidebarSectionLinkProps = {
  section: Section
  onNavigate: () => void
}

const itemClass = 'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition'

export const SidebarSectionLink = ({ section, onNavigate }: SidebarSectionLinkProps) => {
  const uid = useUserId()
  const { completionPercent } = useSectionProgress(uid, section.id)

  if (section.comingSoon) {
    return (
      <span className={`${itemClass} cursor-default text-muted-foreground`}>
        <SectionIcon name={section.icon} className="size-4" />
        <span className="flex-1">{section.title}</span>
        <span className="text-[10px] tracking-wide uppercase">Soon</span>
      </span>
    )
  }

  return (
    <Link
      to="/lessons/$sectionId"
      params={{ sectionId: section.id }}
      onClick={onNavigate}
      className={`${itemClass} hover:bg-muted/60`}
      activeProps={{ className: 'bg-primary text-primary-foreground hover:bg-primary' }}
    >
      <SectionIcon name={section.icon} className="size-4" />
      <span className="flex-1 truncate">{section.title}</span>
      <Progress
        value={completionPercent}
        aria-label="Completed"
        className="w-10"
        trackClassName="h-1 bg-foreground/20"
        indicatorClassName="bg-current"
      />
    </Link>
  )
}
