import type { ElementResultDto, ScenarioStepDto } from '@/shared/api'

export type Segment = {
  text: string
  element?: ElementResultDto
}

type Range = { start: number; end: number; element: ElementResultDto }

/**
 * Splits the expected response into plain text and element segments, so each required
 * element can be colored where it appears in the phrase. Elements whose wording is not
 * found in the phrase are returned separately.
 */
export const highlightElements = (expected: string, step: ScenarioStepDto, elements: ElementResultDto[]) => {
  const lower = expected.toLowerCase()
  const ranges: Range[] = []
  const unplaced: ElementResultDto[] = []

  for (const element of elements) {
    const definition = step.requiredElements.find((e) => e.id === element.id)
    const candidates = [element.label, ...(definition?.acceptedVariants ?? [])]
      .map((c) => c.toLowerCase())
      .toSorted((a, b) => b.length - a.length)

    let placed: Range | null = null
    for (const candidate of candidates) {
      let from = 0
      while (!placed) {
        const start = lower.indexOf(candidate, from)
        if (start === -1) break
        const end = start + candidate.length
        if (!ranges.some((r) => start < r.end && end > r.start)) {
          placed = { start, end, element }
        }
        from = start + 1
      }
      if (placed) break
    }

    if (placed) ranges.push(placed)
    else unplaced.push(element)
  }

  ranges.sort((a, b) => a.start - b.start)
  const segments: Segment[] = []
  let cursor = 0
  for (const range of ranges) {
    if (range.start > cursor) segments.push({ text: expected.slice(cursor, range.start) })
    segments.push({ text: expected.slice(range.start, range.end), element: range.element })
    cursor = range.end
  }
  if (cursor < expected.length) segments.push({ text: expected.slice(cursor) })

  return { segments, unplaced }
}
