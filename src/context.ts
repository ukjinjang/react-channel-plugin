import { createContext } from 'react';
import type {
  ChannelIOApiBootMethodArgs,
  ChannelIOApiShutdownMethodArgs,
  ChannelIOUser,
} from './ChannelIO';

interface ReactChannelIOContextValue {
  isBooted: boolean;
  boot: (...args: ChannelIOApiBootMethodArgs) => Promise<ChannelIOUser>;
  shutdown: (...args: ChannelIOApiShutdownMethodArgs) => void;
}

export const ReactChannelIOContext = createContext(
  (null as unknown) as ReactChannelIOContextValue
);
