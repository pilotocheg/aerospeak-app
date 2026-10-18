/**
 * Dev fallback: scenarios from content/ that are not deployed to the backend yet are
 * transcribed by the browser (Web Speech API) and scored with the local copy of the engine.
 * Never enabled in production builds: browser STT sends audio to the browser vendor.
 */
export const LOCAL_SCORING_FALLBACK = import.meta.env.DEV
