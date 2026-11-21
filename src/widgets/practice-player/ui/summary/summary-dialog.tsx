import { TriangleAlert } from 'lucide-react'

import type { PracticeSummary } from '@/features/practice-session'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { ScoreRing } from '@/shared/ui/score-ring'

import { formatRetryImprovement } from '../../lib/format-retry-improvement'
import { Callout } from '../common/callout'
import { SummaryMetric } from './summary-metric'

type SummaryDialogProps = {
  open: boolean
  title: string
  summary: PracticeSummary
  onRepeat: () => void
  onClose: () => void
}

export const SummaryDialog = ({ open, title, summary, onRepeat, onClose }: SummaryDialogProps) => {
  const { scenarioScore, phrasesRecorded, successfulPhrases, bestPhraseScore, retryImprovement, missedCritical } =
    summary

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <DialogTitle>Scenario complete</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <ScoreRing value={scenarioScore} size={96} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <SummaryMetric label="Phrases recorded" value={phrasesRecorded} />
          <SummaryMetric label="Successful phrases" value={successfulPhrases} />
          <SummaryMetric label="Best phrase" value={`${bestPhraseScore}%`} />
          <SummaryMetric label="Retry improvement" value={formatRetryImprovement(retryImprovement)} />
        </div>

        {missedCritical.length > 0 && (
          <Callout tone="destructive" icon={TriangleAlert}>
            <p>Still missing: {missedCritical.join(', ')}</p>
          </Callout>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onRepeat}>
            Repeat
          </Button>
          <Button onClick={onClose}>Back to scenarios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
