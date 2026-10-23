import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from './index'

const meta = {
  title: 'Components/Field',
  component: Field,
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const VerticalInput: Story = {
  render: () => (
    <div className="w-90">
      <Field>
        <FieldLabel htmlFor="callsign">Callsign</FieldLabel>
        <FieldContent>
          <Input id="callsign" placeholder="SP-TFA" />
          <FieldDescription>Use aircraft registration exactly as in the scenario.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-90">
      <Field>
        <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
        <FieldContent>
          <Input id="frequency" placeholder="118.505" aria-invalid />
          <FieldError errors={[{ message: 'Frequency format must be XXX.XXX' }]} />
        </FieldContent>
      </Field>
    </div>
  ),
}

export const GroupedOptions: Story = {
  render: () => (
    <div className="w-105">
      <FieldSet>
        <FieldLegend>Practice settings</FieldLegend>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="atc-transcript" defaultChecked />
            <FieldLabel htmlFor="atc-transcript">Show ATC transcript</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="student-transcript" />
            <FieldLabel htmlFor="student-transcript">Show response transcript</FieldLabel>
          </Field>
          <Field>
            <FieldTitle>Microphone source</FieldTitle>
            <FieldContent>
              <Input placeholder="Default microphone" />
              <FieldDescription>Choose the device used for transmission recording.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
}
