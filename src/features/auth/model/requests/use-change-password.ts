import { useMutation } from '@tanstack/react-query'

import { changeCurrentUserPassword } from '../../api'

type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
}

export const useChangePassword = () =>
  useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordInput) =>
      changeCurrentUserPassword(currentPassword, newPassword),
  })
