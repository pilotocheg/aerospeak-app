import { cn } from 'cn'
import { ArrowDownUp, TriangleAlert } from 'lucide-react'

import { isMissedCritical } from '@/entities/attempt'
import type { ElementResultDto } from '@/shared/api'

import { ELEMENT_TEXT_CLASS } from '../lib/element-styles'

type ElementChipProps = {
  element: ElementResultDto
  text: string
  isSelected: boolean
  isOutOfOrder: boolean
  onSelect: (id: string) => void
}

/** A scored element inside the expected response; tapping it shows its details. */
export const ElementChip = ({ element, text, isSelected, isOutOfOrder, onSelect }: ElementChipProps) => (
  <button
    type="button"
    onClick={() => onSelect(element.id)}
    className={cn('rounded-sm transition hover:bg-muted', ELEMENT_TEXT_CLASS[element.status], isSelected && 'bg-muted')}
  >
    {text}
    {isMissedCritical(element) && <TriangleAlert className="ml-0.5 inline size-3.5" />}
    {isOutOfOrder && (
      <>
        <ArrowDownUp className={cn('ml-0.5 inline size-3.5', ELEMENT_TEXT_CLASS.partial)} />
        <span className="sr-only"> (said in the wrong place)</span>
      </>
    )}
  </button>
)
