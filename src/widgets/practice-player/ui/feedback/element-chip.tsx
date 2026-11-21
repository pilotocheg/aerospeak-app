import { cn } from 'cn'
import { ArrowDownUp, TriangleAlert } from 'lucide-react'

import { isMissedCritical } from '@/entities/attempt'
import type { ElementResultDto } from '@/shared/api'

import { ELEMENT_STATUS_LABEL, ELEMENT_STATUS_TEXT_CLASS, ELEMENT_TEXT_CLASS } from '../../lib/feedback/element-styles'

type ElementChipProps = {
  element: ElementResultDto
  text: string
  isSelected: boolean
  isOutOfOrder: boolean
  onSelect: (id: string) => void
}

/** A scored element inside the expected response; tapping it shows its details. */
export const ElementChip = ({ element, text, isSelected, isOutOfOrder, onSelect }: ElementChipProps) => {
  const { id, status } = element

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      className={cn('rounded-sm transition hover:bg-muted', ELEMENT_TEXT_CLASS[status], isSelected && 'bg-muted')}
    >
      {text}
      <span className="sr-only"> ({ELEMENT_STATUS_LABEL[status]})</span>
      {isMissedCritical(element) && <TriangleAlert className="ml-0.5 inline size-3.5" aria-hidden />}
      {isOutOfOrder && (
        <>
          <ArrowDownUp className={cn('ml-0.5 inline size-3.5', ELEMENT_STATUS_TEXT_CLASS.partial)} />
          <span className="sr-only"> (said in the wrong place)</span>
        </>
      )}
    </button>
  )
}
