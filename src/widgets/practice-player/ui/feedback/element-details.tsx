import type { ElementResultDto } from '@/shared/api'

import { ELEMENT_STATUS_LABEL, ELEMENT_STATUS_TEXT_CLASS, ELEMENT_TEXT_CLASS } from '../../lib/feedback/element-styles'
import { ElementWords } from './element-words'

type ElementDetailsProps = {
  element: ElementResultDto
  isOutOfOrder: boolean
}

export const ElementDetails = ({ element, isOutOfOrder }: ElementDetailsProps) => {
  const { label, critical, status, hint, matchedText, words } = element

  return (
    <div className="space-y-1 text-sm">
      <p className="font-semibold">
        {label}
        {critical && <span className="ml-2 text-xs text-destructive uppercase">Safety-critical</span>}
      </p>
      <p className={ELEMENT_STATUS_TEXT_CLASS[status]}>{ELEMENT_STATUS_LABEL[status]}</p>
      {isOutOfOrder && <p className={ELEMENT_TEXT_CLASS.partial}>Said in the wrong place</p>}
      {hint && <p className={ELEMENT_TEXT_CLASS.partial}>{hint}</p>}
      {matchedText && <p className="text-muted-foreground">Heard: “{matchedText}”</p>}
      {words.length > 0 && <ElementWords words={words} />}
    </div>
  )
}
