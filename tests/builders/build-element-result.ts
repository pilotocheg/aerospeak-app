import type { ElementResultDto } from '@/shared/api'

/** A scored element of a readback; matched and not critical unless overridden. */
export const buildElementResult = (overrides: Partial<ElementResultDto> = {}): ElementResultDto => ({
  id: 'runway',
  label: 'runway 28',
  status: 'matched',
  critical: false,
  similarity: 1,
  words: [],
  ...overrides,
})
