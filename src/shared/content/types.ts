export type SectionIcon = 'list-ordered' | 'route' | 'sun' | 'radio-tower' | 'cloud'

/** Top-level grouping of packs (frontend only, the backend has no sections). */
export type Section = {
  id: string
  title: string
  icon: SectionIcon
  description: string
  packIds: string[]
  comingSoon?: boolean
}
