import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './card'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    size: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Card {...args} className="w-90 px-6">
      <h3 className="font-heading text-lg font-semibold">Scenario Card</h3>
      <p className="text-muted-foreground">
        Practice your call with instant scoring and phrase-by-phrase feedback.
      </p>
    </Card>
  ),
}
