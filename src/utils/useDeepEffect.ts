import { useEffect, useRef } from 'react';
import deepEqual from 'fast-deep-equal';

import type { DependencyList, EffectCallback } from 'react';

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
