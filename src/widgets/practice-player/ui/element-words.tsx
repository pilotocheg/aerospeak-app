import { cn } from 'cn'

import type { WordResultDto } from '@/shared/api'

import { ELEMENT_STATUS_LABEL, ELEMENT_TEXT_CLASS, WORD_ELEMENT_STATUS } from '../lib/element-styles'

type ElementWordsProps = {
  words: WordResultDto[]
}

const wordNote = (word: WordResultDto) => {
  if (word.unclear) return 'not clear'
  if (word.status !== 'correct' && word.heard) return `heard “${word.heard}”`
  // An optional standard word that was left out ("altitude"): understood, but say it.
  if (word.status === 'almost') return 'not said'
  return null
}

export const ElementWords = ({ words }: ElementWordsProps) => (
  <ul aria-label="Expected words" className="flex flex-wrap justify-center gap-x-3 gap-y-2 pt-1">
    {words.map((word, index) => {
      const status = WORD_ELEMENT_STATUS[word.status]
      const note = wordNote(word)
      return (
        <li key={index} className="flex flex-col items-center leading-tight">
          <span className={cn('font-medium', ELEMENT_TEXT_CLASS[status])}>{word.expected}</span>
          <span className="sr-only"> ({ELEMENT_STATUS_LABEL[status]})</span>
          {note && <span className="mt-0.5 text-xs text-muted-foreground">{note}</span>}
        </li>
      )
    })}
  </ul>
)
