import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './index'

type ButtonProps = ComponentProps<typeof Button>

const variants = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const satisfies NonNullable<
  ButtonProps['variant']
>[]
const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const satisfies NonNullable<
  ButtonProps['size']
>[]

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} className="capitalize">
          {variant}
        </Button>
      ))}
    </div>
  ),
}
