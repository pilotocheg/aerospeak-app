import { z } from 'zod'

import { password } from './schemas'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password'),
    newPassword: password,
    confirmPassword: z.string().min(1, 'Repeat your new password'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    message: 'New password must be different from the current one',
    path: ['newPassword'],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
