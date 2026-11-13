import type { Meta, StoryObj } from '@storybook/react-vite'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './index'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <Collapsible className="w-[320px] rounded-md border p-2">
      <CollapsibleTrigger className="w-full text-left text-sm font-medium">Toggle</CollapsibleTrigger>
      <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
        Hidden content revealed.
      </CollapsibleContent>
    </Collapsible>
  ),
}
