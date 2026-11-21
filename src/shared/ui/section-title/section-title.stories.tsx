import type { Meta, StoryObj } from '@storybook/react-vite'

import { SectionTitle } from './index'

const meta = {
  title: 'Components/SectionTitle',
  component: SectionTitle,
  args: {
    children: 'Expected response',
    as: 'h3',
  },
  argTypes: {
    as: { control: 'select', options: ['h2', 'h3', 'p'] },
  },
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
