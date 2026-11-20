import { useState } from 'react'
import { cn } from 'cn'

import type { ElementResultDto, ScenarioStepDto } from '@/shared/api'

import { ELEMENT_DOT_CLASS, ELEMENT_STATUS_LABEL } from '../lib/element-styles'
import { highlightElements } from '../lib/highlight-elements'
import { ElementChip } from './element-chip'
import { ElementDetails } from './element-details'

type KeywordFeedbackProps = {
  step: ScenarioStepDto
  expected: string
  elements: ElementResultDto[]
  /** Ids of elements said in the wrong place. */
  outOfOrder: string[]
}

export const KeywordFeedback = ({ step, expected, elements, outOfOrder }: KeywordFeedbackProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { segments, unplaced } = highlightElements(expected, step, elements)
  const selected = elements.find((element) => element.id === selectedId)

  const chipProps = (element: ElementResultDto) => ({
    element,
    isSelected: selectedId === element.id,
    isOutOfOrder: outOfOrder.includes(element.id),
    onSelect: setSelectedId,
  })

  return (
    <div className="space-y-4">
      <p className="text-center text-lg leading-relaxed">
        {segments.map((segment, index) =>
          segment.element ? (
            <ElementChip key={index} text={segment.text} {...chipProps(segment.element)} />
          ) : (
            <span key={index} className="text-muted-foreground">
              {segment.text}
            </span>
          ),
        )}
      </p>

      {unplaced.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {unplaced.map((element) => (
            <ElementChip key={element.id} text={element.label} {...chipProps(element)} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 border-t pt-3 text-xs">
        {(['matched', 'partial', 'missed'] as const).map((status) => (
          <span key={status} className="flex items-center gap-1.5">
            <span className={cn('size-2.5 rounded-full', ELEMENT_DOT_CLASS[status])} />
            {ELEMENT_STATUS_LABEL[status]}
          </span>
        ))}
      </div>

      <div className="flex min-h-20 items-center justify-center rounded-lg bg-background p-4 text-center">
        {selected ? (
          <ElementDetails element={selected} isOutOfOrder={outOfOrder.includes(selected.id)} />
        ) : (
          <p className="text-muted-foreground">Tap a highlighted phrase for details</p>
        )}
      </div>
    </div>
  )
}
