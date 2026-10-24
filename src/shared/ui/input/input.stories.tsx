import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './index'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Enter text',
    disabled: false,
    type: 'text',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <Input {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
  },
  render: (args) => (
    <div className="w-[320px]">
      <Input {...args} />
    </div>
  ),
}
