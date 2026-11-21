import type { ElementResultDto } from '@/shared/api'

/** A safety-critical element the readback left out or got wrong. */
export const isMissedCritical = (element: Pick<ElementResultDto, 'critical' | 'status'>) =>
  element.critical && element.status === 'missed'
