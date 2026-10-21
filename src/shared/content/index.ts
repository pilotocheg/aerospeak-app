import sectionsFile from './sections.json'
import type { Section } from './types'

export type * from './types'

/** Packs and scenarios come from the backend (GET /packs); sections only group them in the UI. */
export const sections = sectionsFile as Section[]
