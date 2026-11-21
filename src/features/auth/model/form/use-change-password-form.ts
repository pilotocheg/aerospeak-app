import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getReauthErrorMessage } from '../../lib/get-reauth-error-message'
import { useChangePassword } from '../requests/use-change-password'
import { changePasswordSchema, type ChangePasswordFormValues } from './change-password-schema'

const DEFAULT_VALUES: ChangePasswordFormValues = { currentPassword: '', newPassword: '', confirmPassword: '' }

export const useChangePasswordForm = () => {
  const changePassword = useChangePassword()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  })

  const onSubmit = handleSubmit(async ({ currentPassword, newPassword }) => {
    try {
      await changePassword.mutateAsync({ currentPassword, newPassword })
      toast.success('Password updated')
      reset()
    } catch (error) {
      toast.error(getReauthErrorMessage(error, 'Failed to update the password. Please try again'))
    }
  })

  return { register, errors, isSubmitting: changePassword.isPending, onSubmit }
}
