import createClient from 'openapi-fetch'

import { API_URL } from '@/shared/config/env'
import { auth } from '@/shared/lib/firebase'

import type { paths } from './schema'

export const apiClient = createClient<paths>({ baseUrl: API_URL })

apiClient.use({
  async onRequest({ request }) {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
})