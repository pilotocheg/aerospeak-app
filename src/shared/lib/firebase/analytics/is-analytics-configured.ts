/** Analytics runs only in a production build that has a Measurement ID, so dev and preview builds never report. */
export const isAnalyticsConfigured = (): boolean =>
  import.meta.env.PROD && Boolean(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
