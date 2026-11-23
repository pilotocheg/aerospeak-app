import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogOut } from 'lucide-react'

import { Button } from '@/shared/ui/button'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './index'

const sides = ['top', 'right', 'bottom', 'left'] as const satisfies NonNullable<
  ComponentProps<typeof TooltipContent>['side']
>[]

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex min-h-40 items-center justify-center">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Log out" />}>
        <LogOut />
      </TooltipTrigger>
      <TooltipContent>Log out</TooltipContent>
    </Tooltip>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" className="capitalize" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
