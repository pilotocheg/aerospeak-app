const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/** Elements inside the container that Tab can reach, in DOM order. */
export const getFocusableElements = (container: HTMLElement) => {
  const candidates = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
  const focusable = candidates.filter((element) => !element.closest('[inert]') && element.getClientRects().length > 0)
  return focusable
}
