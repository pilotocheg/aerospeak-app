import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

import { getReauthErrorMessage } from '../../lib/get-reauth-error-message'
import { useDeleteAccount } from '../requests/use-delete-account'
import { useHasPasswordProvider } from '../session/use-has-password-provider'

export const useDeleteAccountForm = () => {
  const navigate = useNavigate()
  const deleteAccount = useDeleteAccount()
  const needsPassword = useHasPasswordProvider()
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')

  const isDeleting = deleteAccount.isPending
  const canDelete = !isDeleting && (!needsPassword || password.length > 0)

  const onOpenChange = (open: boolean) => {
    if (isDeleting && !open) {
      return
    }
    setIsOpen(open)
    if (!open) {
      setPassword('')
    }
  }

  const onDelete = async () => {
    try {
      const { firebaseUserDeleted } = await deleteAccount.mutateAsync({ password })
      if (firebaseUserDeleted) {
        toast.success('Your account has been deleted')
      } else {
        toast.warning('Your data was deleted, but we could not remove your sign-in. Sign in again to finish.')
      }
      await navigate({ to: '/', replace: true })
    } catch (error) {
      toast.error(getReauthErrorMessage(error, 'Failed to delete the account. Please try again'))
    }
  }

  return { isOpen, onOpenChange, password, setPassword, needsPassword, isDeleting, canDelete, onDelete }
}
