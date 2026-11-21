import { sections } from '@/shared/content'

export const getSection = (id: string) => sections.find((section) => section.id === id)
