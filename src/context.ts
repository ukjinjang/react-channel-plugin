import { createContext } from 'react';

import type { ChannelIOUser } from './ChannelIO';

interface ReactChannelIOContextValue {
  isBooted: boolean;
  boot: () => Promise<ChannelIOUser>;
  shutdown: () => void;
}

export const ReactChannelIOContext = createContext(
  null as unknown as ReactChannelIOContextValue
);
