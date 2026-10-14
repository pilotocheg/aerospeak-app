import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  )
}