import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from './skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Blocks: Story = {
  render: () => (
    <div className="w-[320px] space-y-3">
      <Skeleton className="h-4 w-[60%]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-28 w-full rounded-xl" />
    </div>
  ),
}
