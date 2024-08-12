import { warnLogger } from './utils/logger';
import { checkSSR } from './utils/ssr';

import type * as channelio from '@channel.io/channel-web-sdk-loader';

//
//
//

type Filter<T> = T extends `on${string}` ? T : never;

//
//
//

/**
 * Map of ChannelIO API functions.
 */
export type ChannalIOApiMap = Pick<
  typeof channelio,
  (typeof CHANNEL_IO_API_NAMES)[number]
>;

/**
 * Map of ChannelIO command API function.
 */
export type ChannalIOCommandApiMap = Pick<
  ChannalIOApiMap,
  Exclude<keyof ChannalIOApiMap, keyof ChannalIOEventApiMap>
>;

/**
 * Map of ChannelIO event API functions.
 */
export type ChannalIOEventApiMap = Pick<
  ChannalIOApiMap,
  Filter<keyof ChannalIOApiMap>
>;

/**
 * Map of ChannelIO API function arguments.
 */
export type ChannalIOApiArgsMap = {
  [K in keyof ChannalIOApiMap]: Parameters<ChannalIOApiMap[K]>;
};

/**
 * Map of ChannelIO command API function arguments.
 */
export type ChannalIOCommandApiArgsMap = {
  [K in keyof ChannalIOCommandApiMap]: Parameters<ChannalIOCommandApiMap[K]>;
};

/**
 * Map of ChannelIO event API function arguments.
 */
export type ChannalIOEventApiArgsMap = {
  [K in keyof ChannalIOEventApiMap]: Parameters<ChannalIOEventApiMap[K]>;
};

//
//
//

/**
 * Boot options for initializing the SDK.
 * @see https://developers.channel.io/docs/web-boot-option
 */
export type ChannelIOBootOption = channelio.BootOption;

/**
 * Represents user information.
 * @see https://developers.channel.io/docs/web-user-object
 */
export type ChannelIOUser = channelio.User;

/**
 * Represents user profile information.
 * - Populated by `updateUser` or the `profile` field in boot options.
 * @see https://developers.channel.io/docs/web-user-object#profile
 */
export type ChannelIOUserProfile = channelio.Profile;

/**
 *
 */
export type ChannelIOUpdateUserData = channelio.UpdateUserInfo;

/**
 * Represents language options.
 * 'de'(German), 'hi'(Hindi), 'no'(Norwegian), 'ru'(Russian), 'fi'(Finnish), 'pt'(Portuguese), 'hr'(Croatian), 'fr'(French), 'hu'(Hungarian), 'uk'(Ukrainian), 'sk'(Slovak), 'ca'(Catalan), 'sv'(Swedish), 'ko'(Korean), 'id'(Indonesian), 'ms'(Malay), 'el'(Greek), 'en'(English), 'it'(Italian), 'es'(Spanish), 'he'(Hebrew), 'zh'(Chinese), 'cs'(Czech), 'ar'(Arabic), 'vi'(Vietnamese),'th'(Thai), 'ja'(Japanese), 'pl'(Polish), 'ro'(Romanian), 'da'(Danish), 'nl'(Dutch), 'tr'(Turkish)
 *
 * @see https://developers.channel.io/docs/web-user-object#language
 * @see https://github.com/channel-io/channel-web-sdk-loader/blob/v1.1.7/src/index.ts#L37
 */
export type ChannelIOLanguage =
  | 'de'
  | 'hi'
  | 'no'
  | 'ru'
  | 'fi'
  | 'pt'
  | 'hr'
  | 'fr'
  | 'hu'
  | 'uk'
  | 'sk'
  | 'ca'
  | 'sv'
  | 'ko'
  | 'id'
  | 'ms'
  | 'el'
  | 'en'
  | 'it'
  | 'es'
  | 'he'
  | 'zh'
  | 'cs'
  | 'ar'
  | 'vi'
  | 'th'
  | 'ja'
  | 'pl'
  | 'ro'
  | 'da'
  | 'nl'
  | 'tr';

//
//
//

/**
 * Names of ChannelIO API functions.
 */
const CHANNEL_IO_API_NAMES = Object.freeze([
  ////////////////////////////////////////////////////////////
  // IMPORTANT:
  // Sort by order of ChannelIO official api reference document,
  // to make it easier to compare with the document.
  // - ref: https://developers.channel.io/docs/web-channelio
  ////////////////////////////////////////////////////////////
  'boot',
  'shutdown',
  'showMessenger',
  'hideMessenger',
  'openChat',
  'openWorkflow',
  'track',
  'onShowMessenger',
  'onHideMessenger',
  'onBadgeChanged',
  'onChatCreated',
  'onFollowUpChanged',
  'onUrlClicked',
  'clearCallbacks',
  'updateUser',
  'addTags',
  'removeTags',
  'setPage',
  'resetPage',
  'showChannelButton',
  'hideChannelButton',
  'setAppearance',
] as const);

/**
 * Names of ChannelIO command API functions.
 */
export const CHANNEL_IO_COMMAND_API_NAMES = Object.freeze(
  CHANNEL_IO_API_NAMES.filter(
    name => !name.startsWith('on')
  ) as (keyof ChannalIOCommandApiMap)[]
);

/**
 * Names of ChannelIO event API functions.
 */
export const CHANNEL_IO_EVENT_API_NAMES = Object.freeze(
  CHANNEL_IO_API_NAMES.filter(name =>
    name.startsWith('on')
  ) as (keyof ChannalIOEventApiMap)[]
);

//
//
//

/**
 * ChannelIO SDK.
 *
 * @see https://developers.channel.io/docs/web-channelio
 */
export const ChannelIO = <K extends keyof ChannalIOApiMap>(
  name: K,
  ...args: ChannalIOApiArgsMap[K]
) => {
  if (checkSSR()) {
    return;
  }

  if (typeof window.ChannelIO !== 'function') {
    warnLogger('ChannelIO instance is not initalized yet.');
    return;
  }

  window.ChannelIO(name, ...args);
};
