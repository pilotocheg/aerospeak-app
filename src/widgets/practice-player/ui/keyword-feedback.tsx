import { useState } from 'react'
import { cn } from 'cn'
import { TriangleAlert } from 'lucide-react'

import type { ElementResultDto, ScenarioStepDto } from '@/shared/api'

import { ELEMENT_DOT_CLASS, ELEMENT_STATUS_LABEL, ELEMENT_TEXT_CLASS } from '../lib/element-styles'
import { highlightElements } from '../lib/highlight-elements'
import { ElementWords } from './element-words'

type KeywordFeedbackProps = {
  step: ScenarioStepDto
  expected: string
  elements: ElementResultDto[]
}

export const KeywordFeedback = ({ step, expected, elements }: KeywordFeedbackProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { segments, unplaced } = highlightElements(expected, step, elements)
  const selected = elements.find((element) => element.id === selectedId)

  const renderElement = (element: ElementResultDto, text: string, key: string | number) => (
    <button
      key={key}
      type="button"
      onClick={() => setSelectedId(element.id)}
      className={cn(
        'rounded-sm transition hover:bg-muted',
        ELEMENT_TEXT_CLASS[element.status],
        selectedId === element.id && 'bg-muted',
      )}
    >
      {text}
      {element.critical && element.status === 'missed' && <TriangleAlert className="ml-0.5 inline size-3.5" />}
    </button>
  )

  return (
    <div className="space-y-4">
      <p className="text-center text-lg leading-relaxed">
        {segments.map((segment, index) =>
          segment.element ? (
            renderElement(segment.element, segment.text, index)
          ) : (
            <span key={index} className="text-muted-foreground">
              {segment.text}
            </span>
          ),
        )}
      </p>

      {unplaced.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {unplaced.map((element) => renderElement(element, element.label, element.id))}
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
          <div className="space-y-1 text-sm">
            <p className="font-semibold">
              {selected.label}
              {selected.critical && <span className="ml-2 text-xs text-red-400 uppercase">Safety-critical</span>}
            </p>
            <p className={ELEMENT_TEXT_CLASS[selected.status].split(' ')[0]}>{ELEMENT_STATUS_LABEL[selected.status]}</p>
            {selected.matchedText && <p className="text-muted-foreground">Heard: “{selected.matchedText}”</p>}
            {selected.words.length > 0 && <ElementWords words={selected.words} />}
          </div>
        ) : (
          <p className="text-muted-foreground">Tap a highlighted phrase for details</p>
        )}
      </div>
    </div>
  )
}
