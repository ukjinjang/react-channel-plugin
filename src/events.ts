import type {
  ChannelIOEventMethod,
  ChannelIOEventMethodArgs,
} from './ChannelIO';

export interface ReactChannelIOInternalCustomEventDetail {
  method: ChannelIOEventMethod;
  args: Parameters<Required<ChannelIOEventMethodArgs>[1]>;
}

export const REACT_CHANNELIO_INTERNAL_CUSTOMEVENT_TYPE = 'react-channelio-evt';

export const REACT_CHANNELIO_EVENT_METHODS: ChannelIOEventMethod[] = [
  'onBoot',
  'onShowMessenger',
  'onShow',
  'onHideMessenger',
  'onHide',
  'onBadgeChanged',
  'onChangeBadge',
  'onChatCreated',
  'onCreateChat',
  'onProfileChanged',
  'onChangeProfile',
  'onUrlClicked',
  'onClickRedirect',
];

/**
 * Get `window.CustomEvent`.
 */
export const getCustomEvent = () => {
  if (typeof window.CustomEvent === 'function') {
    return window.CustomEvent;
  }

  // Polyfill `window.CustomEvent`.
  // - ref: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill
  const CustomEvent = function <T = any>(
    typeArg: string,
    eventInitDict?: CustomEventInit<T>
  ) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      typeArg,
      eventInitDict?.bubbles ?? false,
      eventInitDict?.cancelable ?? false,
      eventInitDict?.detail ?? undefined
    );
  };

  CustomEvent.prototype = window.Event.prototype;

  (window as any).CustomEvent = CustomEvent;

  return window.CustomEvent;
};

/**
 * Create dispatching function for ChannelIO event.
 */
export const createChannelIOEventDispatcher = (
  method: ChannelIOEventMethod
) => {
  return (...args: Parameters<Required<ChannelIOEventMethodArgs>[1]>) => {
    document.dispatchEvent(
      new (getCustomEvent())<ReactChannelIOInternalCustomEventDetail>(
        REACT_CHANNELIO_INTERNAL_CUSTOMEVENT_TYPE,
        {
          detail: {
            method,
            args,
          },
        }
      )
    );
  };
};
