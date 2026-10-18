import type { ComponentProps } from 'react'
import { cn } from 'cn'

type FieldErrorProps = ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}

const getErrorContent = (errors: FieldErrorProps['errors']) => {
  if (!errors?.length) {
    return null
  }

  const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

  if (uniqueErrors.length === 1) {
    return uniqueErrors[0]?.message
  }

  return (
    <ul className="ml-4 flex list-disc flex-col gap-1">
      {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
    </ul>
  )
}

export const FieldError = ({ className, children, errors, ...props }: FieldErrorProps) => {
  const content = children ?? getErrorContent(errors)

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-sm font-normal text-destructive', className)}
      {...props}
    >
      {content}
    </div>
  )
}
