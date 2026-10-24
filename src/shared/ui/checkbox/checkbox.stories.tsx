import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './index'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    'aria-label': 'Show ATC transcript',
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}
