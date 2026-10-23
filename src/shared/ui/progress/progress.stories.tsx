import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    value: 60,
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <Progress {...args} />
    </div>
  ),
}
