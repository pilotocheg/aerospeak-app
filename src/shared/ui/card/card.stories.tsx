import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/shared/ui/button'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './index'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    size: 'default',
  },
  argTypes: {
    size: { control: 'select', options: ['default', 'sm'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Card {...args} className="w-90">
      <CardHeader>
        <CardTitle>Taxi to holding point</CardTitle>
        <CardDescription>EPPO · SP-TFA · 4 steps</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Practice your call with instant scoring and phrase-by-phrase feedback.</p>
      </CardContent>
      <CardFooter>
        <Button>Start</Button>
      </CardFooter>
    </Card>
  ),
}
