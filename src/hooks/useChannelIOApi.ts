import { useCallback, useRef } from 'react';

import { CHANNEL_IO_COMMAND_API_NAMES, ChannelIO } from '../ChannelIO';
import { _useContext } from './_useContext';

import type { ReactChannelIOContextValue } from 'src/context';
import type { ChannalIOCommandApiMap } from '../ChannelIO';

//
//
//

type UseChannelIOApiReturn =
  // from root provider
  Pick<ReactChannelIOContextValue, 'boot' | 'shutdown'> &
    // direct API
    Omit<ChannalIOCommandApiMap, 'boot' | 'shutdown'>;

//
//
//

/**
 * A hook to trigger Channel IO API.
 *
 * @see https://developers.channel.io/docs/web-channelio
 */
export const useChannelIOApi = () => {
  const _return = useRef({} as UseChannelIOApiReturn);

  const context = _useContext();

  CHANNEL_IO_COMMAND_API_NAMES.forEach(name => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (_return.current as any)[name] = useCallback(
      (...args: Parameters<ChannalIOCommandApiMap[typeof name]>) => {
        ChannelIO(name, ...args);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
  });

  _return.current.boot = context.boot;
  _return.current.shutdown = context.shutdown;

  return _return.current;
};
