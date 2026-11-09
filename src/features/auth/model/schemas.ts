import { z } from 'zod'

const email = z.email('Enter a valid email address').trim()
const password = z.string().min(8, 'Password must be at least 8 characters')

export const loginSchema = z.object({
  email,
  password,
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name').max(100, 'Name is too long'),
    email,
    password,
    confirmPassword: z.string().min(1, 'Repeat your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>

export const passwordResetSchema = z.object({
  email,
})

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>
