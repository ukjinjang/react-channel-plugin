import { createContext } from 'react';

import type * as channelio from '@channel.io/channel-web-sdk-loader';

//
//
//

export interface ReactChannelIOContextValue {
  isBooted: boolean;
  boot: () => Promise<channelio.User | null>;
  shutdown: () => void;
}

//
//
//

export const ReactChannelIOContext = createContext(
  null as unknown as ReactChannelIOContextValue
);
