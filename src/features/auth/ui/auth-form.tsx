import type { FormEvent, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

type AuthFormProps = {
  title: string
  description: string
  submitLabel: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children?: ReactNode
  footer: ReactNode
}

export function AuthForm({ title, description, submitLabel, onSubmit, children, footer }: AuthFormProps) {
  return (
    <Card className="w-full border-border bg-card shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <Button type="submit" className="w-full gap-2">
            {submitLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4 text-sm text-muted-foreground">
        {footer}
      </CardFooter>
    </Card>
  )
}

export function AuthField({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  type?: string
  name: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
