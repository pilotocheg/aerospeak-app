import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './index'

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const satisfies NonNullable<
  ComponentProps<typeof Badge>['variant']
>[]

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    variant: 'default',
  },
  argTypes: {
    variant: { control: 'select', options: variants },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant} className="capitalize">
          {variant}
        </Badge>
      ))}
    </div>
  ),
}
