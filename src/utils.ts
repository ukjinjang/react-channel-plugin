import { useEffect, useRef } from 'react';
import deepEqual from 'fast-deep-equal';
import type { DependencyList, EffectCallback } from 'react';

/**
 * Hook for callback from prop.
 */
export const useCallbackProp = <T>(cb: T) => {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  return cbRef;
};

/**
 * `useEffect` hook that compare dependencies deeply.
 */
export const useDeepEffect = <D extends DependencyList>(
  effect: EffectCallback,
  deps: D
) => {
  const ref = useRef<D | undefined>(undefined);

  if (!ref.current || !deepEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(effect, ref.current);
};

/**
 * Check current env SSR.
 */
export function checkSSR() {
  return typeof window === 'undefined';
}

/**
 * Inject script.
 */
export async function scriptInjector(scriptUrl: string) {
  if (document.querySelector(`[src="${scriptUrl}"]`)) {
    return;
  }

  return new Promise<void>((resolve, reject) => {
    const el = document.createElement('script');
    el.src = scriptUrl;
    el.async = true;
    el.defer = true;

    el.onload = () => {
      resolve();
      el.onload = null;
      el.onerror = null;
    };

    el.onerror = () => {
      reject(new Error('Fail to inject SDK script.'));
      el.onload = null;
      el.onerror = null;
    };

    document.head.appendChild(el);
  });
}

/**
 * Log warning.
 */
export function warnLogger(...msgs: string[]) {
  // eslint-disable-next-line no-console
  console.warn('[ReactChannelIO]', ...msgs);
}
