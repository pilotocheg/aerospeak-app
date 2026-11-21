import { sections } from '@/shared/content'

export const findSectionByPackId = (packId: string) => sections.find((section) => section.packIds.includes(packId))
