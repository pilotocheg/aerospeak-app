import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useChangeUsernameForm } from '../../model/form/use-change-username-form'

export const ChangeUsernameDialog = () => {
  const { isOpen, onOpenChange, register, errors, currentName, isChanging, onSubmit } = useChangeUsernameForm()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button />}>Change username</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <DialogHeader>
            <DialogTitle>Write your new username</DialogTitle>
          </DialogHeader>
          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="change-username">Username</FieldLabel>
            <Input
              id="change-username"
              type="text"
              autoComplete="name"
              placeholder={currentName}
              aria-invalid={!!errors.username}
              {...register('username')}
            />
            <FieldError errors={[errors.username]} />
          </Field>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <Button type="submit" disabled={isChanging}>
              {isChanging ? 'Changing...' : 'Change'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
