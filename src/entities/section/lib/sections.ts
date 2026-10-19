import type { PracticePackDto } from '@/shared/api'
import { sections } from '@/shared/content'

export const getSection = (id: string) => sections.find((section) => section.id === id)

export const findSectionByPackId = (packId: string) => sections.find((section) => section.packIds.includes(packId))

/** Packs of a section, in the section's order. */
export const getSectionPacks = (sectionId: string, packs: PracticePackDto[]) =>
  (getSection(sectionId)?.packIds ?? []).flatMap((packId) => packs.filter((pack) => pack.id === packId))
