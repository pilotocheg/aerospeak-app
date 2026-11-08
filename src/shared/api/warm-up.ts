import { apiClient } from './client'

/**
 * The backend runs on Render's free tier and sleeps after inactivity; a cold
 * start takes ~30–60 s. Ping /health as soon as the app loads so the server
 * (and its database) is awake by the time the user reaches a scenario.
 * Fire-and-forget: the result is not used and errors are ignored.
 */
export const warmUpBackend = () => {
  apiClient.GET('/health').catch(() => {})
}
