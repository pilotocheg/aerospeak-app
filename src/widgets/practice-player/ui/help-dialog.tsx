import type { ScenarioDto, ScenarioStepDto } from '@/shared/api'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

import { SectionTitle } from '@/shared/ui/section-title'

import { HearExpectedButton } from './hear-expected-button'
import { Panel } from './panel'

type HelpDialogProps = {
  open: boolean
  scenario: ScenarioDto
  step: ScenarioStepDto
  callsign?: string
  onOpenChange: (open: boolean) => void
}

export const HelpDialog = ({ open, scenario, step, callsign, onOpenChange }: HelpDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Help</DialogTitle>
      </DialogHeader>

      <section className="space-y-2">
        <SectionTitle>Situation</SectionTitle>
        <Panel className="space-y-3">
          <p>{step.prompt}</p>
          {callsign && (
            <p className="text-sm text-muted-foreground">
              Who you are: <span className="font-medium text-foreground">{callsign}</span>
            </p>
          )}
        </Panel>
      </section>

      <section className="space-y-2">
        <SectionTitle>Conversation</SectionTitle>
        <Panel className="space-y-3">
          {step.atcText && (
            <div>
              <p className="text-xs text-muted-foreground">ATC</p>
              <p className="italic">{step.atcText}</p>
            </div>
          )}
          <div className="ml-auto max-w-[90%] text-right">
            <p className="text-xs text-muted-foreground">Expected response</p>
            <p className="rounded-lg bg-primary p-2 text-left text-primary-foreground">{step.expectedPilotResponse}</p>
          </div>
        </Panel>
        <HearExpectedButton text={step.expectedPilotResponse} />
      </section>

      {scenario.phraseologyNote && (
        <section className="space-y-2">
          <SectionTitle>{scenario.phraseologyNote.title}</SectionTitle>
          <p className="text-sm">{scenario.phraseologyNote.shortExplanation}</p>
          {scenario.phraseologyNote.whyItMatters && (
            <p className="text-sm text-muted-foreground">{scenario.phraseologyNote.whyItMatters}</p>
          )}
        </section>
      )}
    </DialogContent>
  </Dialog>
)
