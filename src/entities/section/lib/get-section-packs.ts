import type { PracticePackDto } from '@/shared/api'

import { getSection } from './get-section'

/** Packs of a section, in the section's order. */
export const getSectionPacks = (sectionId: string, packs: PracticePackDto[]) =>
  (getSection(sectionId)?.packIds ?? []).flatMap((packId) => packs.filter((pack) => pack.id === packId))
