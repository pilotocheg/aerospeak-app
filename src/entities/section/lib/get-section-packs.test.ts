import { describe, expect, it } from 'vitest'

import type { PracticePackDto } from '@/shared/api'
import { sections } from '@/shared/content'

import { getSectionPacks } from './get-section-packs'

const buildPack = (id: string): PracticePackDto => ({ id, title: id, description: '', order: 0, scenarios: [] })

const [section] = sections
const [firstPackId, secondPackId] = section.packIds

describe('getSectionPacks', () => {
  it("returns the section's packs in the section's order", () => {
    const packs = [buildPack(secondPackId), buildPack('other-pack'), buildPack(firstPackId)]

    const sectionPacks = getSectionPacks(section.id, packs)

    expect(sectionPacks.map((pack) => pack.id)).toEqual([firstPackId, secondPackId])
  })

  it('skips section packs the backend does not have', () => {
    const packs = [buildPack(secondPackId)]

    const sectionPacks = getSectionPacks(section.id, packs)

    expect(sectionPacks.map((pack) => pack.id)).toEqual([secondPackId])
  })

  it('returns nothing for an unknown section', () => {
    const sectionPacks = getSectionPacks('unknown-section', [buildPack(firstPackId)])

    expect(sectionPacks).toEqual([])
  })
})
