import { Cloud, ListOrdered, RadioTower, Route, Sun, type LucideProps } from 'lucide-react'

import type { SectionIcon as SectionIconName } from '@/shared/content'

const ICONS = {
  'list-ordered': ListOrdered,
  route: Route,
  sun: Sun,
  'radio-tower': RadioTower,
  cloud: Cloud,
} satisfies Record<SectionIconName, unknown>

type SectionIconProps = LucideProps & { name: SectionIconName }

export const SectionIcon = ({ name, ...props }: SectionIconProps) => {
  const Icon = ICONS[name]
  return <Icon {...props} />
}
