import type { ElementResultDto, WordResultDto } from '@/shared/api'

export const ELEMENT_TEXT_CLASS: Record<ElementResultDto['status'], string> = {
  matched: 'text-green-500',
  partial: 'text-amber-400',
  missed: 'text-red-500 underline decoration-2 underline-offset-4',
}

export const ELEMENT_DOT_CLASS: Record<ElementResultDto['status'], string> = {
  matched: 'bg-green-500',
  partial: 'bg-amber-400',
  missed: 'bg-red-500',
}

export const ELEMENT_STATUS_LABEL: Record<ElementResultDto['status'], string> = {
  matched: 'Correct',
  partial: 'Almost',
  missed: 'Missing / incorrect',
}

/** Words share the element legend: correct / almost / missing. */
export const WORD_ELEMENT_STATUS: Record<WordResultDto['status'], ElementResultDto['status']> = {
  correct: 'matched',
  almost: 'partial',
  missing: 'missed',
}
