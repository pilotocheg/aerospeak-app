import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/button'

import { Toaster } from './toaster'

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        <Button onClick={() => toast.success('Scenario completed')}>Success</Button>
        <Button onClick={() => toast.warning('Transmission quality is low')} variant="secondary">
          Warning
        </Button>
        <Button onClick={() => toast.error('Could not submit attempt')} variant="destructive">
          Error
        </Button>
      </div>
      <Toaster />
    </>
  ),
}
