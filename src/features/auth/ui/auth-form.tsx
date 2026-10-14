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
    <Card className="w-full max-w-md border-slate-800 bg-slate-900/80 text-slate-50 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold tracking-tight text-white">{title}</CardTitle>
        <CardDescription className="text-sm text-slate-300">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <Button type="submit" className="w-full gap-2 bg-indigo-500 text-white hover:bg-indigo-400">
            {submitLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-slate-800 pt-4 text-sm text-slate-300">
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
      <Label htmlFor={name} className="text-sm text-slate-200">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-400 focus-visible:ring-indigo-500"
      />
    </div>
  )
}
