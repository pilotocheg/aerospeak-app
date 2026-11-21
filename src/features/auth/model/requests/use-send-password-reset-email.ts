import { useMutation } from '@tanstack/react-query'

import { sendPasswordResetEmail } from '../../api'

import type { PasswordResetFormValues } from '../form/schemas'

export const useSendPasswordResetEmail = () =>
  useMutation({
    mutationFn: async ({ email }: PasswordResetFormValues) => {
      try {
        await sendPasswordResetEmail(email)
      } catch {
        // ignore error for enumeration protection
      }
    },
  })
