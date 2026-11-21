import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useChangeUsername } from '../requests/use-change-username'
import { useUser } from '../selectors'
import { changeUsernameSchema, type ChangeUsernameFormValues } from './change-username-schema'

const DEFAULT_VALUES: ChangeUsernameFormValues = { username: '' }

export const useChangeUsernameForm = () => {
  const user = useUser()
  const changeUsername = useChangeUsername()
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUsernameFormValues>({
    resolver: zodResolver(changeUsernameSchema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  })

  const isChanging = changeUsername.isPending

  const onOpenChange = (open: boolean) => {
    if (isChanging && !open) {
      return
    }
    setIsOpen(open)
    if (!open) {
      reset()
    }
  }

  const onSubmit = handleSubmit(async ({ username }) => {
    if (username !== user?.name) {
      try {
        await changeUsername.mutateAsync({ username })
        toast.success('Username was changed!')
      } catch {
        toast.error('Failed to change the username. Please try again')
        return
      }
    }
    setIsOpen(false)
    reset()
  })

  return { isOpen, onOpenChange, register, errors, currentName: user?.name, isChanging, onSubmit }
}
