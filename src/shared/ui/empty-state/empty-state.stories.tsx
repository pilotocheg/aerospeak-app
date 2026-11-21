import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/shared/ui/button'
import { EmptyState } from './index'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    message: 'Scenario not found.',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const MessageOnly: Story = {}

export const WithAction: Story = {
  args: {
    action: <Button variant="outline">Back to scenarios</Button>,
  },
}
