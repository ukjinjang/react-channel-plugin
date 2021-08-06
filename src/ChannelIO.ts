import { checkSSR, warnLogger } from './utils';

type Tail<T extends readonly any[]> = ((...t: T) => void) extends (
  m: any,
  ...r: infer R
) => void
  ? R
  : never;

type ChannelIOBuilder<M extends ChannelIOMethod, U extends any[] = []> = [
  method: M,
  ...args: U
];

export type ChannelIOMethod = ChannelIOApiMethod | ChannelIOEventMethod;

export type ChannelIOApiMethod =
  | 'boot'
  | 'shutdown'
  | 'showMessenger'
  | 'show'
  | 'hideMessenger'
  | 'hide'
  | 'lounge'
  | 'openChat'
  | 'track'
  | 'clearCallbacks'
  | 'updateUser'
  | 'addTags'
  | 'removeTags'
  | 'setPage'
  | 'resetPage'
  | 'showChannelButton'
  | 'hideChannelButton';

export type ChannelIOEventMethod =
  | 'onBoot'
  | 'onShowMessenger'
  | 'onShow'
  | 'onHideMessenger'
  | 'onHide'
  | 'onBadgeChanged'
  | 'onChangeBadge'
  | 'onChatCreated'
  | 'onCreateChat'
  | 'onProfileChanged'
  | 'onChangeProfile'
  | 'onUrlClicked'
  | 'onClickRedirect';

export type ChannelIOMethodArgs =
  | ChannelIOApiMethodArgs
  | ChannelIOEventMethodArgs;

export type ChannelIOApiMethodArgs =
  | ChannelIOBootMethodArgs
  | ChannelIOShutdownMethodArgs
  | ChannelIOShowMessengerMethodArgs
  | ChannelIOShowMethodArgs
  | ChannelIOHideMessengerMethodArgs
  | ChannelIOHideMethodArgs
  | ChannelIOLoungeMethodArgs
  | ChannelIOOpenChatMethodArgs
  | ChannelIOTrackMethodArgs
  | ChannelIOClearCallbacksMethodArgs
  | ChannelIOUpdateUserMethodArgs
  | ChannelIOAddTagsMethodArgs
  | ChannelIORemoveTagsMethodArgs
  | ChannelIOSetPageMethodArgs
  | ChannelIOResetPageMethodArgs
  | ChannelIOShowChannelButtonMethodArgs
  | ChannelIOHideChannelButtonMethodArgs;

export type ChannelIOEventMethodArgs =
  | ChannelIOOnBootMethodArgs
  | ChannelIOOnShowMessengerMethodArgs
  | ChannelIOOnShowMethodArgs
  | ChannelIOOnHideMessengerMethodArgs
  | ChannelIOOnHideMethodArgs
  | ChannelIOOnBadgeChangedMethodArgs
  | ChannelIOOnChangeBadgeMethodArgs
  | ChannelIOOnChatCreatedMethodArgs
  | ChannelIOOnCreateChatMethodArgs
  | ChannelIOOnProfileChangedMethodArgs
  | ChannelIOOnChangeProfileMethodArgs
  | ChannelIOOnUrlClickedMethodArgs
  | ChannelIOOnClickRedirectMethodArgs;

export type ChannelIOEventMethodArgsRecords = {
  onBoot: [callback?: (error?: any, user?: ChannelIOUser) => void];
  onShowMessenger: [callback?: () => void];
  onShow: [callback?: () => void];
  onHideMessenger: [callback?: () => void];
  onHide: [callback?: () => void];
  onBadgeChanged: [callback?: (unreadCount: number) => void];
  onChangeBadge: [callback?: (unreadCount: number) => void];
  onChatCreated: [callback?: () => void];
  onCreateChat: [callback?: () => void];
  onProfileChanged: [callback?: (profile: ChannelIOUserProfile) => void];
  onChangeProfile: [callback?: (profile: ChannelIOUserProfile) => void];
  onUrlClicked: [callback?: (url: string) => void];
  onClickRedirect: [callback?: (url: string) => void];
};

//
//
//

/**
 * ### `boot`
 *
 * Boot up channel plugin(button) to make it ready to use
 *
 * @link https://developers.channel.io/docs/web-channel-io#boot
 *
 * @param option a Boot Option object contains informations to initialize Channel IO plugin
 * @param callback a callback function which will be called after boot
 */
type ChannelIOBootMethodArgs = ChannelIOBuilder<
  'boot',
  [
    option?: ChannelIOBootOption,
    callback?: (error?: any, user?: ChannelIOUser) => void
  ]
>;

export type ChannelIOApiBootMethodArgs = [
  option: Tail<ChannelIOBootMethodArgs>[0] // remove callback to provide as Promise
];

/**
 * ### `shutdown`
 *
 * Shutdown channel plugin
 *
 * @link https://developers.channel.io/docs/web-channel-io#shutdown
 */
type ChannelIOShutdownMethodArgs = ChannelIOBuilder<'shutdown'>;

export type ChannelIOApiShutdownMethodArgs = Tail<ChannelIOShutdownMethodArgs>;

/**
 * ### `showMessenger`
 *
 * Show plugin messenger
 *
 * @link https://developers.channel.io/docs/web-channel-io#showmessenger
 */
type ChannelIOShowMessengerMethodArgs = ChannelIOBuilder<'showMessenger'>;

export type ChannelIOApiShowMessengerMethodArgs =
  Tail<ChannelIOShowMessengerMethodArgs>;

/**
 * ### `show`
 *
 * Show plugin messenger
 *
 * @link https://developers.channel.io/docs/web-channel-io#show
 *
 * @deprecated
 * `show` will be supported until 2022. After that time it will be deprecated.
 * Recommend to use `showMessenger` instead.
 */
type ChannelIOShowMethodArgs = ChannelIOBuilder<'show'>;

export type ChannelIOApiShowMethodArgs = Tail<ChannelIOShowMethodArgs>;

/**
 * ### `hideMessenger`
 *
 * Hide plugin messenger
 *
 * @link https://developers.channel.io/docs/web-channel-io#hidemessenger
 */
type ChannelIOHideMessengerMethodArgs = ChannelIOBuilder<'hideMessenger'>;

export type ChannelIOApiHideMessengerMethodArgs =
  Tail<ChannelIOHideMessengerMethodArgs>;

/**
 * ### `hide`
 *
 * Hide plugin messenger
 *
 * @link https://developers.channel.io/docs/web-channel-io#hide
 *
 * @deprecated
 * `hide` will be supported until 2022. After that time it will be deprecated.
 * Recommend to use `hideMessenger` instead.
 */
type ChannelIOHideMethodArgs = ChannelIOBuilder<'hide'>;

export type ChannelIOApiHideMethodArgs = Tail<ChannelIOHideMethodArgs>;

/**
 * ### `lounge`
 *
 * Go to the lounge view.
 *
 * @link https://developers.channel.io/docs/web-channel-io#lounge
 *
 * @deprecated
 * `lounge` will be supported until 2022. After that time it will be deprecated.
 * `lounge` API won't work in all mobile environments.
 */
type ChannelIOLoungeMethodArgs = ChannelIOBuilder<'lounge'>;

export type ChannelIOApiLoungeMethodArgs = Tail<ChannelIOLoungeMethodArgs>;

/**
 * ### `openChat`
 *
 * Open a chat with the given chat id and message.
 * If the given chat id exists, appropriate chat will be opened.
 * If not, lounge will be opened. In this case, the message will be ignored.
 * If chat id is empty and message is given, new chat will be opened and the given message will be put in the input box.
 * In this case, the support bot will not run.
 * if chat id and message is both empty, new chat will be opened.
 *
 * @link https://developers.channel.io/docs/web-channel-io#openchat
 *
 * @param chatId The id of the chat
 * @param message The message which will be put in the input box on messenger when new chat is opened
 */
type ChannelIOOpenChatMethodArgs = ChannelIOBuilder<
  'openChat',
  [chatId?: string | number, message?: string]
>;

export type ChannelIOApiOpenChatMethodArgs = Tail<ChannelIOOpenChatMethodArgs>;

/**
 * ### `track`
 *
 * Track an event
 *
 * @link https://developers.channel.io/docs/web-channel-io#track
 *
 * @param eventName name of event, its length should be less than 30
 * @param eventProperty an object contains key/value information
 */
type ChannelIOTrackMethodArgs = ChannelIOBuilder<
  'track',
  [eventName: string, eventProperty: Record<string, any>]
>;

export type ChannelIOApiTrackMethodArgs = Tail<ChannelIOTrackMethodArgs>;

/**
 * ### `clearCallbacks`
 *
 * Clear all callbacks registered.
 *
 * @link https://developers.channel.io/docs/web-channel-io#clearcallbacks
 */
type ChannelIOClearCallbacksMethodArgs = ChannelIOBuilder<'clearCallbacks'>;

/**
 * ### `updateUser`
 *
 * Update user information.
 *
 * @link https://developers.channel.io/docs/web-channel-io#updateuser
 */
type ChannelIOUpdateUserMethodArgs = ChannelIOBuilder<
  'updateUser',
  [
    data: ChannelIOUpdateUserData,
    callback?: (error?: any, user?: ChannelIOUser) => void
  ]
>;

export type ChannelIOApiUpdateUserMethodArgs = [
  data: Tail<ChannelIOUpdateUserMethodArgs>[0] // remove callback to provide as Promise
];

/**
 * Data of `updateUser`.
 */
export interface ChannelIOUpdateUserData {
  /**
   * Set user's language. When language is 'ko' or 'ja', interface is change to these languages.
   * Else case, interface language is set to english.
   * When set invalid language, user's language field is set to null
   */
  language?: ChannelIOLanguage | null;
  /**
   * Tags to overwrite.
   * Max 10 tags are allowed.
   * Set null to reset.
   * Empty list is not allowed.
   */
  tags?: string[] | null;
  /**
   * Profile map to overwrite.
   * Set null to reset.
   * Set null for profile value to reset profile value.
   * Empty map is not allowed.
   * Always lower case.
   */
  profile?: ChannelIOUserProfile | null;
  /**
   * Map of profile to be added if there is no each profile values.
   */
  profileOnce?: ChannelIOUserProfile;
  /**
   * Terminates the user's marketing subscription.
   * If the existing value is true,
   * the value of true is maintained even if you change it to the value of false.
   */
  unsubscribed?: boolean;
}

/**
 * ### `addTags`
 *
 * Add tags.
 *
 * @link https://developers.channel.io/docs/web-channel-io#addtags
 *
 * @param array Tags to be added.
 * Duplicate values are maintained.
 * Combined tag list cannot exceed 10.
 * Null or empty list is not allowed.
 * Always lower case.
 */
type ChannelIOAddTagsMethodArgs = ChannelIOBuilder<
  'addTags',
  [array: string[], callback?: (error?: any, user?: ChannelIOUser) => void]
>;

export type ChannelIOApiAddTagsMethodArgs = [
  array: Tail<ChannelIOAddTagsMethodArgs>[0] // remove callback to provide as Promise
];

/**
 * ### `removeTags`
 *
 * Remove tags.
 *
 * @link https://developers.channel.io/docs/web-channel-io#removetags
 *
 * @param array Tags to be erased.
 * If there is no match tag value, it is ignored.
 * Null or empty list is not allowed.
 */
type ChannelIORemoveTagsMethodArgs = ChannelIOBuilder<
  'removeTags',
  [array: string[], callback?: (error?: any, user?: ChannelIOUser) => void]
>;

export type ChannelIOApiRemoveTagsMethodArgs = [
  array: Tail<ChannelIORemoveTagsMethodArgs>[0] // remove callback to provide as Promise
];

/**
 * ### `setPage`
 *
 * Set page to be used instead of canonical url .
 *
 * `setPage` with null or undefined is different from resetPage. (that will send page data with null)
 *
 * @link https://developers.channel.io/docs/web-channel-io#setpage
 *
 * @param page Page data to replace default page value
 */
type ChannelIOSetPageMethodArgs = ChannelIOBuilder<'setPage', [page: string]>;

export type ChannelIOApiSetPageMethodArgs = Tail<ChannelIOSetPageMethodArgs>;

/**
 * ### `resetPage`
 *
 * Reset page data customized by developer.
 *
 * If you call resetPage, page data will fill with canonical url .
 *
 * @link https://developers.channel.io/docs/web-channel-io#resetpage
 */
type ChannelIOResetPageMethodArgs = ChannelIOBuilder<'resetPage'>;

export type ChannelIOApiResetPageMethodArgs =
  Tail<ChannelIOResetPageMethodArgs>;

/**
 * ### `showChannelButton`
 *
 * Show channel button.
 *
 * @link https://developers.channel.io/docs/web-channel-io#showchannelbutton
 */
type ChannelIOShowChannelButtonMethodArgs =
  ChannelIOBuilder<'showChannelButton'>;

export type ChannelIOApiShowChannelButtonMethodArgs =
  Tail<ChannelIOShowChannelButtonMethodArgs>;

/**
 * ### `hideChannelButton`
 *
 * Hide channel button.
 *
 * @link https://developers.channel.io/docs/web-channel-io#hidechannelbutton
 */
type ChannelIOHideChannelButtonMethodArgs =
  ChannelIOBuilder<'hideChannelButton'>;

export type ChannelIOApiHideChannelButtonMethodArgs =
  Tail<ChannelIOHideChannelButtonMethodArgs>;

/**
 * ### `onBoot`
 *
 * Register a callback function when boot was completed.
 * Returns a user if boot was succeeded. user is undefined when boot failed.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onboot
 *
 * @deprecated
 * `onBoot` will be supported until 2022. After that time it will be deprecated
 * Recommend to use `boot` callback instead.
 */
type ChannelIOOnBootMethodArgs = ChannelIOBuilder<
  'onBoot',
  ChannelIOEventMethodArgsRecords['onBoot']
>;

/**
 * ### `onShowMessenger`
 *
 * Register a callback function when the chat list is shown.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onshowmessenger
 */
type ChannelIOOnShowMessengerMethodArgs = ChannelIOBuilder<
  'onShowMessenger',
  ChannelIOEventMethodArgsRecords['onShowMessenger']
>;

/**
 * ### `onShow`
 *
 * Register a callback function when the chat list is shown.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onshow
 *
 * @deprecated
 * `onShow` will be supported until 2022. After that time it will be deprecated
 * Recommend to use `onShowMessenger` instead. `onShow` API won't work in all mobile environments.
 */
type ChannelIOOnShowMethodArgs = ChannelIOBuilder<
  'onShow',
  ChannelIOEventMethodArgsRecords['onShow']
>;

/**
 * ### `onHideMessenger`
 *
 * Register a callback function when the chat list is hidden.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onhidemessenger
 */
type ChannelIOOnHideMessengerMethodArgs = ChannelIOBuilder<
  'onHideMessenger',
  ChannelIOEventMethodArgsRecords['onHideMessenger']
>;

/**
 * ### `onHide`
 *
 * Register a callback function when the chat list is hidden.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onhide
 *
 * @deprecated
 * `onHide` will be supported until 2022. After that time it will be deprecated
 * Recommend to use `onHideMessenger` instead. `onHide` API won't work in all mobile environments.
 */
type ChannelIOOnHideMethodArgs = ChannelIOBuilder<
  'onHide',
  ChannelIOEventMethodArgsRecords['onHide']
>;

/**
 * ### `onBadgeChanged`
 *
 * Register a callback when `unreadCount` is changed.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onbadgechanged
 */
type ChannelIOOnBadgeChangedMethodArgs = ChannelIOBuilder<
  'onBadgeChanged',
  ChannelIOEventMethodArgsRecords['onBadgeChanged']
>;

/**
 * ### `onChangeBadge`
 *
 * Register a callback when `unreadCount` is changed.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onchangebadge
 *
 * @deprecated
 * `onChangeBadge` will be supported until 2022. After that time it will be deprecated
 * Recommend to use `onBadgeChanged` instead.
 */
type ChannelIOOnChangeBadgeMethodArgs = ChannelIOBuilder<
  'onChangeBadge',
  ChannelIOEventMethodArgsRecords['onChangeBadge']
>;

/**
 * ### `onChatCreated`
 *
 * Register a callback when a user success to create a chat.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onchatcreated
 */
type ChannelIOOnChatCreatedMethodArgs = ChannelIOBuilder<
  'onChatCreated',
  ChannelIOEventMethodArgsRecords['onChatCreated']
>;

/**
 * ### `onCreateChat`
 *
 * Register a callback when a user success to create a chat.
 *
 * @link https://developers.channel.io/docs/web-channel-io#oncreatechat
 *
 * @deprecated
 * onCreateChat will be supported until 2022. After that time it will be deprecated
 * Recommend to use onChatCreated instead. onCreateChat API won't work in all mobile environments
 */
type ChannelIOOnCreateChatMethodArgs = ChannelIOBuilder<
  'onCreateChat',
  ChannelIOEventMethodArgsRecords['onCreateChat']
>;

/**
 * ### `onProfileChanged`
 *
 * Register a callback when a user success to change their profile in the settings page and chats.
 * `profile` is an object of the user's profile.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onprofilechanged
 */
type ChannelIOOnProfileChangedMethodArgs = ChannelIOBuilder<
  'onProfileChanged',
  ChannelIOEventMethodArgsRecords['onProfileChanged']
>;

/**
 * ### `onChangeProfile`
 *
 * Register a callback when a user success to change their profile in the settings page and chats.
 * `profile` is an object of the user's profile.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onchangeprofile
 *
 * @deprecated
 * `onChangeProfile` will be supported until 2022. After that time it will be deprecated
 * Recommend to use `onProfileChanged` instead. `onChangeProfile` API won't work in all mobile environments
 */
type ChannelIOOnChangeProfileMethodArgs = ChannelIOBuilder<
  'onChangeProfile',
  ChannelIOEventMethodArgsRecords['onChangeProfile']
>;

/**
 * ### `onUrlClicked`
 *
 * Register a callback when a user clicks redirect images or buttons.
 * We pass the redirect url to a function.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onurlclicked
 */
type ChannelIOOnUrlClickedMethodArgs = ChannelIOBuilder<
  'onUrlClicked',
  ChannelIOEventMethodArgsRecords['onUrlClicked']
>;

/**
 * ### `onClickRedirect`
 *
 * Register a callback when a user clicks redirect images or buttons.
 * We pass the redirect url to a function.
 *
 * @link https://developers.channel.io/docs/web-channel-io#onclickredirect
 *
 * @deprecated
 * `onClickRedirect` will be supported until 2022. After that time it will be deprecated
 * Recommend to use `onUrlClicked` instead.
 */
type ChannelIOOnClickRedirectMethodArgs = ChannelIOBuilder<
  'onClickRedirect',
  ChannelIOEventMethodArgsRecords['onClickRedirect']
>;

//
//
//

/**
 * An object that contains information for ChannelIO boot
 *
 * @link https://developers.channel.io/docs/web-boot-option
 */
export interface ChannelIOBootOption {
  /**
   * Channel plugin's key
   */
  pluginKey: string;
  /**
   * member (user) identification id used by your company
   */
  memberId?: string;
  /**
   * Css selector for custom button.
   * Use it with `hideChannelButtonOnBoot` set to `true`
   */
  customLauncherSelector?: string;
  /**
   * Flag to decide whether to hide the default button.
   */
  hideChannelButtonOnBoot?: boolean;
  /**
   * Custom plugin button's z-index
   */
  zIndex?: number;
  /**
   * Set default language.
   * Only (en, ko, ja) available.
   * It does not change for users who have already been created.
   */
  language?: ChannelIOLanguage;
  /**
   * Whether to send default events (usually PageView).
   * Default value is `true`
   *
   * @deprecated
   * `enabledTrackDefaultEvent` will be supported until 2022. After that time it will be deprecated.
   * Recommend to use `trackDefaultEvent` instead.
   */
  trackDefaultEvent?: boolean;
  /**
   * Flag to decide whether to track UTM source and referrer or not.
   * Default value is `true`
   *
   * @deprecated
   * `enabledUtmSourceTrack` will be supported until 2022. After that time it will be deprecated.
   * Recommend to use `trackUtmSource` instead.
   */
  trackUtmSource?: boolean;
  /**
   * Profile object contains user information.
   * If this property is present, it will be used when boot is get called
   * Set `null` to reset.
   */
  profile?: ChannelIOUserProfile | null;
  /**
   * Set chat ux.
   * Only (newTab, iframe) available.
   * default is "newTab"
   *
   * @deprecated
   * mobileOpenUI will be supported until 2022. After that time it will be deprecated.
   * Recommend to use mobileMessengerMode instead.
   */
  mobileMessengerMode?: 'newTab' | 'iframe';
  /**
   * a value of whether or not to accept marketing
   */
  unsubscribed?: boolean;
  /**
   * the hashed value of `memberId` using SHA256
   */
  memberHash?: string;
  /**
   * Set whether to hide marketing and message notification pop-up
   */
  hidePopup?: boolean;
}

/**
 * An object that contains information about user.
 *
 * @link https://developers.channel.io/docs/web-user-object
 */
export interface ChannelIOUser {
  id?: string;
  channelId: string;
  memberId?: string;
  veilId: string;
  name?: string;
  profile?: ChannelIOUserProfile;
  tags?: string[];
  alert: number;
  unread: number;
  blocked: boolean;
  unsubscribed: boolean;
  hasChat?: true;
  hasPushToken?: false;
  language: ChannelIOLanguage;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  web: {
    device: string;
    os: string;
    osName: string;
    browser: string;
    browserName: string;
    sessionsCount: number;
    lastSeenAt: number;
  };
  sessionsCount: number;
  lastSeenAt: number;
  createdAt: number;
  updatedAt: number;
  version: number;
  managedKey?: number;
  member?: boolean;
  email?: string;
  avatarUrl: string;
  mobileNumber?: string;
  systemLanguage: ChannelIOLanguage | string;
}

/**
 * an object contains key/value information.
 */
export interface ChannelIOUserProfile extends Partial<Record<string, string>> {
  name?: string;
  email?: string;
  avatarUrl?: string;
  mobileNumber?: string;
}

/**
 * Language of ChannelIO plugin support.
 * Only `en`, `ko`, `ja` available.
 */
export type ChannelIOLanguage = 'en' | 'ko' | 'ja';

//
//
//

type ChannelIOSdk = (...args: ChannelIOMethodArgs) => void;

/**
 * ChannelIO SDK.
 *
 * @link https://developers.channel.io/docs/web-channel-io
 */
export const ChannelIO: ChannelIOSdk = (method, ...args) => {
  if (checkSSR()) {
    return;
  }

  if (typeof window.ChannelIO !== 'function') {
    warnLogger('ChannelIO instance is not initalized yet.');
    return;
  }

  window.ChannelIO(method, ...args);
};
