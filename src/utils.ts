/**
 * Inject script for oauth.
 * @param scriptUrl URL to import script.
 * @param global    Global variable for script.
 * @returns   Is script loaded successfully?
 */
export function scriptInjector(scriptUrl: string, global?: string) {
  return new Promise<void>((resolve, reject) => {
    if (global && typeof (window as any)[global] !== 'undefined') {
      resolve();
      return;
    }

    const ele = document.createElement('script');

    // Set attributes for script.
    ele.src = scriptUrl;
    ele.async = true;
    ele.defer = true;

    // Set attributes for event listeners.
    ele.onload = () => {
      resolve();
      ele.onload = null;
      ele.onerror = null;
    };
    ele.onerror = () => {
      reject('ERR_SCRIPT_INJECTION_FAILED');
      ele.onload = null;
      ele.onerror = null;
    };

    // Append to head.
    document.head.appendChild(ele);
  });
}
