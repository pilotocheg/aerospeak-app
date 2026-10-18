/**
 * Copy of the backend scoring engine (SergeyPoly/goit--apstone-project-AeroSpeak-BE, src/scoring).
 * Used only as a dev fallback when a scenario from content/ is not deployed to the backend yet,
 * and by scripts/check-content.ts. Do not change it here: change the backend and copy it again.
 */
export * from './types';
export { normalize, tokenize } from './normalize';
export { levenshtein, similarity, matchElement } from './match';
export { scoreTransmission, toDisplayScore, CRITICAL_MISS_CAP } from './score';
