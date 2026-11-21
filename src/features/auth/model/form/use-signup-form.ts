import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useRegister } from '../actions'
import { signupSchema, type SignupFormValues } from './schemas'

export const useSignupForm = () => {
  const registerUser = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    try {
      await registerUser({ name, email, password })
      toast.success('Account created successfully')
    } catch {
      toast.error('Failed to create account')
    }
  })

  return { register, errors, isSubmitting, onSubmit }
}
