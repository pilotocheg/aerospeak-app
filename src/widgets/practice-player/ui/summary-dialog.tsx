import { TriangleAlert } from 'lucide-react'

import type { PracticeSummary } from '@/features/practice-session'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { ScoreRing } from '@/shared/ui/score-ring'

import { SummaryMetric } from './summary-metric'

type SummaryDialogProps = {
  open: boolean
  title: string
  summary: PracticeSummary
  onRepeat: () => void
  onClose: () => void
}

export const SummaryDialog = ({ open, title, summary, onRepeat, onClose }: SummaryDialogProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
    <DialogContent showCloseButton={false}>
      <DialogHeader className="items-center text-center">
        <DialogTitle>Scenario complete</DialogTitle>
        <DialogDescription>{title}</DialogDescription>
      </DialogHeader>

      <div className="flex justify-center">
        <ScoreRing value={summary.scenarioScore} size={96} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <SummaryMetric label="Phrases recorded" value={summary.phrasesRecorded} />
        <SummaryMetric label="Successful phrases" value={summary.successfulPhrases} />
        <SummaryMetric label="Best phrase" value={`${summary.bestPhraseScore}%`} />
        <SummaryMetric
          label="Retry improvement"
          value={
            summary.retryImprovement === null
              ? '–'
              : `${summary.retryImprovement >= 0 ? '+' : ''}${summary.retryImprovement}`
          }
        />
      </div>

      {summary.missedCritical.length > 0 && (
        <div className="flex gap-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          <TriangleAlert className="size-5 shrink-0" />
          <p>Still missing: {summary.missedCritical.join(', ')}</p>
        </div>
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
