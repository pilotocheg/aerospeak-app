import type { Meta, StoryObj } from '@storybook/react-vite'

import { ScoreRing } from './score-ring'

const meta = {
  title: 'Components/ScoreRing',
  component: ScoreRing,
  args: {
    value: 78,
    size: 72,
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    size: {
      control: { type: 'range', min: 40, max: 140, step: 2 },
    },
  },
} satisfies Meta<typeof ScoreRing>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Ranges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ScoreRing value={34} />
      <ScoreRing value={52} />
      <ScoreRing value={66} />
      <ScoreRing value={88} />
      <ScoreRing value={null} />
    </div>
  ),
}
