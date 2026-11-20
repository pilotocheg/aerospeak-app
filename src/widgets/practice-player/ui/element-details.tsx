import type { ElementResultDto } from '@/shared/api'

import { ELEMENT_STATUS_LABEL, ELEMENT_STATUS_TEXT_CLASS, ELEMENT_TEXT_CLASS } from '../lib/element-styles'
import { ElementWords } from './element-words'

type ElementDetailsProps = {
  element: ElementResultDto
  isOutOfOrder: boolean
}

export const ElementDetails = ({ element, isOutOfOrder }: ElementDetailsProps) => (
  <div className="space-y-1 text-sm">
    <p className="font-semibold">
      {element.label}
      {element.critical && <span className="ml-2 text-xs text-destructive uppercase">Safety-critical</span>}
    </p>
    <p className={ELEMENT_STATUS_TEXT_CLASS[element.status]}>{ELEMENT_STATUS_LABEL[element.status]}</p>
    {isOutOfOrder && <p className={ELEMENT_TEXT_CLASS.partial}>Said in the wrong place</p>}
    {element.hint && <p className={ELEMENT_TEXT_CLASS.partial}>{element.hint}</p>}
    {element.matchedText && <p className="text-muted-foreground">Heard: “{element.matchedText}”</p>}
    {element.words.length > 0 && <ElementWords words={element.words} />}
  </div>
)
