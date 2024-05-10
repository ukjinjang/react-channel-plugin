import { useContext } from 'react';

import { ReactChannelIOContext } from '../context';

/**
 * @internal ONLY FOR INTERNAL USE.
 */
export const _useContext = () => {
  const context = useContext(ReactChannelIOContext);
  if (!context) {
    throw new Error(
      'Oops, looks like you forgot Provider for ChannelIO hooks.'
    );
  }

  return context;
};
