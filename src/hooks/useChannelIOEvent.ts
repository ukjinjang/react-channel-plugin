import React, { useContext, useEffect } from 'react';

import { ReactChannelIOContext } from '../context';
import {
  checkEventMethodValidity,
  REACT_CHANNELIO_INTERNAL_CUSTOMEVENT_TYPE,
} from '../events';
import { useCallbackProp, warnLogger } from '../utils';

import type {
  ChannelIOEventMethod,
  ChannelIOEventMethodArgsRecords,
} from '../ChannelIO';
import type { ReactChannelIOInternalCustomEventDetail } from '../events';

/**
 * Using ChannelIO events through React hook.
 *
 * @link https://developers.channel.io/docs/web-channel-io
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
   * Handle Channel IO event.
   */
  const handleChannelIOEvent = React.useCallback(
    (evt: Event) => {
      const channelIOEvent = (
        evt as CustomEvent<ReactChannelIOInternalCustomEventDetail>
      ).detail;

      if (!checkEventMethodValidity(channelIOEvent.method)) {
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
  // Add event listener for Channel IO event.
  //
  useEffect(() => {
    if (!checkEventMethodValidity(method)) {
      warnLogger(
        'Given method name is not exist at Channel IO.',
        'Please refer https://developers.channel.io/docs/web-channel-io.'
      );
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
  }, [method, handleChannelIOEvent]);
};
