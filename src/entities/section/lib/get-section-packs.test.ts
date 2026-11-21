import { describe, expect, it, vi } from 'vitest'

import type { PracticePackDto } from '@/shared/api'

import { getSectionPacks } from './get-section-packs'

// A fixed section instead of sections.json, so content edits do not break the test.
const { SECTION_ID, FIRST_PACK_ID, SECOND_PACK_ID } = vi.hoisted(() => ({
  SECTION_ID: 'basics',
  FIRST_PACK_ID: 'basics-alphabet',
  SECOND_PACK_ID: 'basics-numbers',
}))

vi.mock('@/shared/content', () => ({
  sections: [
    {
      id: SECTION_ID,
      title: 'Basics',
      icon: 'list-ordered',
      description: '',
      packIds: [FIRST_PACK_ID, SECOND_PACK_ID],
    },
  ],
}))

const buildPack = (id: string): PracticePackDto => ({ id, title: id, description: '', order: 0, scenarios: [] })

describe('getSectionPacks', () => {
  it("returns the section's packs in the section's order", () => {
    const packs = [buildPack(SECOND_PACK_ID), buildPack('other-pack'), buildPack(FIRST_PACK_ID)]

    const sectionPacks = getSectionPacks(SECTION_ID, packs)

    expect(sectionPacks.map((pack) => pack.id)).toEqual([FIRST_PACK_ID, SECOND_PACK_ID])
  })

  it('skips section packs the backend does not have', () => {
    const packs = [buildPack(SECOND_PACK_ID)]

    const sectionPacks = getSectionPacks(SECTION_ID, packs)

    expect(sectionPacks.map((pack) => pack.id)).toEqual([SECOND_PACK_ID])
  })

  it('returns nothing for an unknown section', () => {
    const sectionPacks = getSectionPacks('unknown-section', [buildPack(FIRST_PACK_ID)])

    expect(sectionPacks).toEqual([])
  })
})
