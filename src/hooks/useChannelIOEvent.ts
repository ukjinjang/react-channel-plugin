import React, { useContext, useEffect } from 'react';
import { ReactChannelIOContext } from '../context';
import {
  ReactChannelIOInternalCustomEventDetail,
  REACT_CHANNELIO_EVENT_METHODS,
  REACT_CHANNELIO_INTERNAL_CUSTOMEVENT_TYPE,
} from '../events';
import { useCallbackProp } from '../utils';
import type {
  ChannelIOEventMethod,
  ChannelIOEventMethodArgsRecords,
} from '../libs';

/**
 *
 * @param method
 * @param callback
 */
export const useChannelIOEvent = <M extends ChannelIOEventMethod>(
  method: M,
  callback?: ChannelIOEventMethodArgsRecords[M][number]
) => {
  const _callback = useCallbackProp(callback);

  const context = useContext(ReactChannelIOContext);
  if (!context) {
    throw new Error(
      'Oops, looks like you forgot Provider for ChannelIO hooks.'
    );
  }

  /**
   *
   */
  const handleChannelIOEvent = React.useCallback(
    (evt: Event) => {
      const channelIOEvent = (evt as CustomEvent<ReactChannelIOInternalCustomEventDetail>)
        .detail;

      if (!REACT_CHANNELIO_EVENT_METHODS.includes(channelIOEvent.method)) {
        return;
      }

      if (method !== channelIOEvent.method) {
        return;
      }

      if (typeof _callback.current === 'function') {
        (_callback.current as any)(...channelIOEvent.args);
      }
    },
    [method, _callback]
  );

  //
  //
  //
  useEffect(() => {
    if (context.isBooted) {
      return;
    }

    document.addEventListener(
      REACT_CHANNELIO_INTERNAL_CUSTOMEVENT_TYPE,
      handleChannelIOEvent,
      false
    );

    return () => {
      document.removeEventListener(
        REACT_CHANNELIO_INTERNAL_CUSTOMEVENT_TYPE,
        handleChannelIOEvent,
        false
      );
    };
  }, [context.isBooted, handleChannelIOEvent]);
};
