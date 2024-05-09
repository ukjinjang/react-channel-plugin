import { CHANNEL_IO_EVENT_API_NAMES, ChannelIO } from './ChannelIO';

import type * as channelio from '@channel.io/channel-web-sdk-loader';
import type { ChannalIOEventApiArgsMap } from './ChannelIO';

//
//
//

type EventApiArgsMap = ChannalIOEventApiArgsMap & {
  onBoot: [callback: channelio.Callback];
};

export type EventFnArgsMap = {
  [K in keyof EventApiArgsMap]: Parameters<EventApiArgsMap[K][0]>;
};

export interface _InternalEventDetail {
  name: keyof EventFnArgsMap;
  args: EventFnArgsMap;
}

//
//
//

export const _INTERNAL_EVENT_TYPE = 'react-channelio-evt';

export const _INTERNAL_EVENT_API_NAMES = Object.freeze([
  ...CHANNEL_IO_EVENT_API_NAMES,
  'onBoot',
] as const);

//
//
//

/**
 * [internal] Create dispatching function for internal event.
 */
export function createEventDispatcher<K extends keyof EventFnArgsMap>(name: K) {
  return (...args: EventFnArgsMap[K]) => {
    document.dispatchEvent(
      new CustomEvent<_InternalEventDetail>(_INTERNAL_EVENT_TYPE, {
        detail: {
          name,
          args: args as any,
        },
      })
    );
  };
}

/**
 * [internal] Register event callbacks.
 */
export function registerCallbackEvents() {
  ChannelIO('clearCallbacks');
  setTimeout(() => {
    CHANNEL_IO_EVENT_API_NAMES.forEach(method => {
      ChannelIO(method, createEventDispatcher(method));
    });
  });
}
