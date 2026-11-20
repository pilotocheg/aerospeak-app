/** 45 -> "45s", 150 -> "3 min" */
export const formatDuration = (seconds: number) => (seconds < 60 ? `${seconds}s` : `${Math.round(seconds / 60)} min`)
