import createClient from 'openapi-fetch'

import { API_URL } from '@/shared/config/env'

import type { paths } from './schema'

export const apiClient = createClient<paths>({ baseUrl: API_URL })
