import { z } from 'zod'

import { name } from './schemas'

export const changeUsernameSchema = z.object({
  username: name,
})

export type ChangeUsernameFormValues = z.infer<typeof changeUsernameSchema>
