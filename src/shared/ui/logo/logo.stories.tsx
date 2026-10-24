import type { Meta, StoryObj } from '@storybook/react-vite'

import { Logo } from './index'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  args: {
    className: 'size-16',
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
