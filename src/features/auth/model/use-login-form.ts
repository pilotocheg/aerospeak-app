import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useLogin } from './actions'
import { loginSchema, type LoginFormValues } from './schemas'

export const useLoginForm = () => {
  const login = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values)
      toast.success('Successfully logged in')
    } catch {
      toast.error('Failed to sign in')
    }
  })

  return { register, errors, isSubmitting, onSubmit }
}
