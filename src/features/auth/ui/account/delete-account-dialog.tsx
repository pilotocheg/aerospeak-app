import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Field, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { useDeleteAccountForm } from '../../model/form/use-delete-account-form'

export const DeleteAccountDialog = () => {
  const { isOpen, onOpenChange, password, setPassword, needsPassword, isDeleting, canDelete, onDelete } =
    useDeleteAccountForm()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button variant="destructive" />}>Delete account</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Delete your account?</DialogTitle>
          <DialogDescription>
            Your profile, transcripts and scores will be removed permanently. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {needsPassword ? (
          <Field>
            <FieldLabel htmlFor="delete-account-password">Enter your password to confirm</FieldLabel>
            <Input
              id="delete-account-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field>
        ) : (
          <p className="text-sm text-muted-foreground">You will be asked to confirm with your Google account.</p>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={onDelete} disabled={!canDelete}>
            {isDeleting ? 'Deleting…' : 'Delete account'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
