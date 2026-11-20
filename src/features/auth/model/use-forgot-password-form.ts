import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { passwordResetSchema, type PasswordResetFormValues } from './schemas'
import { useSendPasswordResetEmail } from './use-send-password-reset-email'

export const useForgotPasswordForm = () => {
  const sendPasswordReset = useSendPasswordResetEmail()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    await sendPasswordReset.mutateAsync(values)
    toast.success('If an account exists with this email, we have sent a password reset link')
  })

  return { register, errors, isSubmitting: sendPasswordReset.isPending, onSubmit }
}
