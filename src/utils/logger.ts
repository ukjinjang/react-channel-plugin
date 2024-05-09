/**
 * Log warning.
 */
export function warnLogger(...msgs: any[]) {
  console.warn('[react-channel-plugin]', ...msgs);
}

/**
 * Log debugging.
 */
export function debugLogger(verbose: boolean, ...msgs: any[]) {
  if (!verbose) {
    return;
  }

  console.debug('⚙️ [react-channel-plugin - debug]', ...msgs);
}
