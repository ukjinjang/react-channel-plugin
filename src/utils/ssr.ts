/**
 * Check current env SSR.
 */
export function checkSSR() {
  return typeof window === 'undefined';
}
