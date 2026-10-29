import { BookOpen, ExternalLink } from 'lucide-react'

import type { PhraseologyNoteDto } from '@/shared/api/types'

type LessonOverviewProps = {
  note: PhraseologyNoteDto
}

/** What the lesson is about and where the rules come from; never the expected answer. */
export const LessonOverview = ({ note }: LessonOverviewProps) => (
  <section className="space-y-3 rounded-lg border bg-card p-4">
    <h2 className="flex items-center gap-2 text-sm font-semibold">
      <BookOpen className="size-4 text-brand" />
      {note.title}
    </h2>
    <p className="text-sm font-medium">{note.shortExplanation}</p>
    {note.overview.map((paragraph) => (
      <p key={paragraph} className="text-sm">
        {paragraph}
      </p>
    ))}
    {note.whyItMatters && <p className="text-sm text-muted-foreground">{note.whyItMatters}</p>}
    <div className="space-y-1 border-t pt-3">
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Read more</h3>
      <ul className="space-y-0.5 text-sm text-muted-foreground">
        {note.references.map(({ source, section, url }) => {
          const label = section ? `${source}, ${section}` : source
          return (
            <li key={label}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-brand underline-offset-4 hover:underline"
                >
                  {label}
                  <ExternalLink className="size-3" />
                </a>
              ) : (
                label
              )}
            </li>
          )
        })}
      </ul>
    </div>
  </section>
)
