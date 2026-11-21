import { describe, expect, it } from 'vitest'

import { buildElementResult, buildScenarioStep } from '@/shared/testing'

import { highlightElements } from './highlight-elements'

const EXPECTED = 'Runway 28, cleared to land, SP-TFA.'

const RUNWAY = buildElementResult({ id: 'runway', label: 'runway 28' })
const CLEARANCE = buildElementResult({ id: 'clearance', label: 'land' })
const CALLSIGN = buildElementResult({ id: 'callsign', label: 'Tango Foxtrot Alpha' })

const step = buildScenarioStep({
  requiredElements: [
    { id: 'runway', label: 'runway 28', acceptedVariants: [], weight: 1 },
    { id: 'clearance', label: 'land', acceptedVariants: ['cleared to land'], weight: 1 },
    { id: 'callsign', label: 'Tango Foxtrot Alpha', acceptedVariants: [], weight: 1 },
  ],
})

describe('highlightElements', () => {
  it('splits the phrase into plain text and element segments, keeping the original case', () => {
    const { segments } = highlightElements(EXPECTED, step, [RUNWAY])

    expect(segments).toEqual([{ text: 'Runway 28', element: RUNWAY }, { text: ', cleared to land, SP-TFA.' }])
  })

  it('highlights the longest accepted wording of an element', () => {
    const { segments } = highlightElements(EXPECTED, step, [CLEARANCE])

    expect(segments).toContainEqual({ text: 'cleared to land', element: CLEARANCE })
  })

  it('orders segments by their place in the phrase, not by element order', () => {
    const { segments } = highlightElements(EXPECTED, step, [CLEARANCE, RUNWAY])

    expect(segments.map(({ text }) => text)).toEqual(['Runway 28', ', ', 'cleared to land', ', SP-TFA.'])
  })

  it('returns elements whose wording is not in the phrase separately', () => {
    const { unplaced } = highlightElements(EXPECTED, step, [CALLSIGN])

    expect(unplaced).toEqual([CALLSIGN])
  })

  it('does not place two elements on the same words', () => {
    const sameWords = buildElementResult({ id: 'runway-again', label: 'runway 28' })

    const { unplaced } = highlightElements(EXPECTED, step, [RUNWAY, sameWords])

    expect(unplaced).toEqual([sameWords])
  })
})
