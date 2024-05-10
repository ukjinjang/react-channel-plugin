import { useEffect } from 'react';

import { _INTERNAL_EVENT_API_NAMES, _INTERNAL_EVENT_TYPE } from '../events';
import { warnLogger } from '../utils/logger';
import { useCurrentRef } from '../utils/useCurrentRef';
import { _useContext } from './_useContext';

import type { _InternalEventDetail, EventFnArgsMap } from '../events';

//
//
//

/**
 * A hook to handle Channel IO event.
 *
 * @see https://developers.channel.io/docs/web-channelio
 */
export const useChannelIOEvent = <K extends keyof EventFnArgsMap>(
  name: K,
  callback?: (...args: EventFnArgsMap[K]) => any
) => {
  const callbackRef = useCurrentRef(callback);

  _useContext();

  //
  // Add event listener for Channel IO event.
  //
  useEffect(
    () => {
      if (!_INTERNAL_EVENT_API_NAMES.includes(name)) {
        warnLogger(
          'Given method name is not exist at Channel IO.',
          'Please refer https://developers.channel.io/docs/web-channelio.'
        );
        return;
      }

      /**
       * Handle Channel IO event.
       */
      const _handle = (evt: Event) => {
        const detail = (evt as CustomEvent)?.detail as _InternalEventDetail;
        if (name !== detail.name) {
          return;
        }

        if (typeof callbackRef.current === 'function') {
          (callbackRef.current as any)(...(detail.args as any));
        }
      };

      document.addEventListener(_INTERNAL_EVENT_TYPE, _handle, false);

      return () => {
        document.removeEventListener(_INTERNAL_EVENT_TYPE, _handle, false);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );
};
