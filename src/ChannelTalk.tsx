/* eslint-disable no-console */
import { Component } from 'react';
import { scriptInjector } from './utils';

/**
 * Language of Channel Talk support.
 * Only (en, ko, ja) available.
 */
export type ChannelTalkLocale = 'en' | 'ko' | 'ja';

/** Props of ChannelTalk. */
export interface ChannelTalkProps extends ChannelTalkPlugInSettings {
  /** Timeout before Channel Talk init. */
  timeout?: number;
  /** On init. */
  onBoot?: (profile: ChannelTalkGuestMeta) => void;
  /** On error occurred. */
  onError?: () => void;
  /** On chatbox show. */
  onShow?: () => void;
  /** On chatbox hide. */
  onHide?: () => void;
  /** On `unreadCount` is changed. */
  onChangeBadge?: (unreadCount: number) => void;
  /** On user success to create a chat. */
  onCreateChat?: () => void;
  /**
   * On user success to change their profile in the settings page and chats.
   * `profile` is an object of the user's profile.
   */
  onChangeProfile?: (profile: ChannelTalkUserProfile) => void;
  /**
   * On user clicks redirect images or buttons.
   * We pass the redirect url to a function.
   */
  onClickRedirect?: (url: string) => void;
}

/** State of ChannelTalk. */
interface ChannelTalkState {
  /** Is plugin init? */
  isInit: boolean;
}

/**
 * Settings for Channel Talk plugin.
 * - ref: https://developers.channel.io/docs/web-channelpluginsettings
 */
export interface ChannelTalkPlugInSettings {
  /** Channel plugin's key */
  pluginKey: string;
  /** User id. */
  userId?: string | number;
  /**
   * Css selector for custom button.
   * Use it with `hideDefaultLauncher` set to `true`.
   */
  customLauncherSelector?: string;
  /** Flag to decide whether to hide the default button. */
  hideDefaultLauncher?: boolean;
  /** Set content on the top of messages on the chat view. */
  chatHeaderContent?: string;
  /**
   * Decide whether it shows a navigation bar on the chat view.
   * Default value is false.
   */
  hideNavigationBarOnChatView?: boolean;
  /**
   * Flag to decide whether to track default events or not.
   * Default value is `true` */
  enabledTrackDefaultEvent?: boolean;
  /**
   * Flag to decide whether to track UTM source and referrer or not.
   * Default value is `true`
   */
  enabledUtmSourceTrack?: boolean;
  /**
   * Flag to decide whether to enter a chat room when you click the button.
   * Default value is `false`
   */
  openChatDirectlyAsPossible?: boolean;
  /** Custom plugin button's z-index. */
  zIndex?: number;
  /**
   * Set default language.
   * Only (en, ko, ja) available.
   */
  locale?: ChannelTalkLocale;
  /**
   * Profile object contains user information.
   * If this property is present, it will be used when boot is get called
   */
  profile?: ChannelTalkUserProfile;
}

/** Guest meta data of Channel Talk. */
export interface ChannelTalkGuestMeta {
  avatarUrl: string;
  bindFrom: string;
  channelId: string;
  color: string;
  country: string;
  createdAt: number;
  email: string;
  ghost: boolean;
  id: string;
  initial: string;
  latitude: number;
  longitude: number;
  locale: ChannelTalkLocale;
  mobileNumber: string;
  name: string;
  named: boolean;
  profile: ChannelTalkUserProfile;
  safeLocale: string;
  segment: string;
  updatedAt: number;
}

/**
 * User profile of Channel Talk plugin.
 * - ref: https://developers.channel.io/docs/web-channelpluginsettings#section-profile-optional
 */
export interface ChannelTalkUserProfile {
  name?: string;
  mobileNumber?: string;
  email?: string;
  avatarUrl?: string;
  [key: string]: any;
}

/** URL of Channel Talk plugin. */
const PLUGIN_URL = 'https://cdn.channel.io/plugin/ch-plugin-web.js';

/**
 * Channel talk plugin helper component.
 * - ref: https://developers.channel.io/docs/web-chplugin
 */
export class ChannelTalk extends Component<ChannelTalkProps, ChannelTalkState> {
  constructor(props: ChannelTalkProps) {
    super(props);
    this.state = {
      isInit: false,
    };
  }

  static defaultProps: ChannelTalkProps = {
    pluginKey: '',
    locale: 'en',
    timeout: 1000,
  };

  /**
   * Open channel talk.
   * - ref: https://developers.channel.io/docs/web-chplugin#section-show
   */
  static show = () => {
    if (typeof (window as any).ChannelIO === 'function') {
      (window as any).ChannelIO('show');
    }
  };

  /**
   * Open chatroom of channel talk.
   * - ref: https://developers.channel.io/docs/web-chplugin#section-open-chat
   */
  static openChat = (chatId: string | number) => {
    if (typeof (window as any).ChannelIO === 'function') {
      (window as any).ChannelIO('openChat', chatId);
    }
  };

  /**
   * Go to the lounge view.
   * - ref: https://developers.channel.io/docs/web-chplugin#section-lounge
   */
  static lounge = () => {
    if (typeof (window as any).ChannelIO === 'function') {
      (window as any).ChannelIO('lounge');
    }
  };

  /**
   * Close channel talk.
   * - ref: https://developers.channel.io/docs/web-chplugin#section-hide
   */
  static hide = () => {
    if (typeof (window as any).ChannelIO === 'function') {
      (window as any).ChannelIO('hide');
    }
  };

  /**
   * Track an event for channel talk.
   * - ref: https://developers.channel.io/docs/web-chplugin#section-track
   */
  static track = (eventName: string, eventProperty: any) => {
    if (typeof (window as any).ChannelIO === 'function') {
      (window as any).ChannelIO('track', eventName, eventProperty);
    }
  };

  /**
   * Clear all registered callbacks of Channel Talk.
   * - ref: https://developers.channel.io/docs/web-chplugin#section-clear-callbacks
   */
  static clearCallbacks = () => {
    if (typeof (window as any).ChannelIO === 'function') {
      (window as any).ChannelIO('clearCallbacks');
    }
  };

  componentDidMount() {
    // If plug in key not provided, return error.
    if (!this.props.pluginKey) {
      console.error('[ChannelTalk] Plug in key not provided!');
      return;
    }

    // Init plugin on mount.
    this.initPlugIn();
  }

  componentWillUnmount() {
    (window as any).ChannelIO('hide');
    (window as any).ChannelIO('clearCallbacks');

    setTimeout(() => {
      // Shutdown channel plugin on unmount.
      (window as any).ChannelIO('shutdown');
    }, 1000);
  }

  /**
   * Initialize Channel Talk plugin.
   */
  private async initPlugIn(): Promise<void> {
    try {
      // If plugin already init, skip init.
      if (this.state.isInit && (window as any).ChannelIO) {
        this.setState({ isInit: true });
        return;
      }

      // Wait before init script.
      await new Promise(resolve => setTimeout(resolve, this.props.timeout));

      // Inject script.
      await scriptInjector(PLUGIN_URL, 'ChannelIO');

      // Wait 300ms after init script.
      await new Promise(resolve => setTimeout(resolve, 500));

      // Register event listeners.
      this.registerEventListeners();

      // Create settings for plug in.
      const plugInSettings: ChannelTalkPlugInSettings = {
        ...this.props,
      };

      // Boot up with settings.
      (window as any).ChannelIO('boot', plugInSettings);

      // Set init status.
      this.setState({ isInit: true });
    } catch (err) {
      this.setState({ isInit: false });
      if (this.props.onError) this.props.onError();
      console.warn('[ChannelTalk] Error occurred while init ChannelTalk!', err);
    }
  }

  /**
   * Register event listeners for Channel Talk.
   * - ref: https://developers.channel.io/docs/web-chplugin
   */
  private registerEventListeners() {
    if (typeof (window as any).ChannelIO !== 'function') {
      return;
    }

    // Clear all callbacks.
    (window as any).ChannelIO('clearCallbacks');

    // Register a callback function when boot was completed.
    (window as any).ChannelIO('onBoot', (guest?: ChannelTalkGuestMeta) => {
      if (guest) {
        if (this.props.onBoot) this.props.onBoot(guest);
      } else {
        if (this.props.onError) this.props.onError();
      }
    });

    // Register a callback function when the chat list is shown.
    (window as any).ChannelIO('onShow', () => {
      if (this.props.onShow) this.props.onShow();
    });

    // Register a callback function when the chat list is hidden.
    (window as any).ChannelIO('onHide', () => {
      if (this.props.onHide) this.props.onHide();
    });

    // Register a callback when `unreadCount` is changed.
    (window as any).ChannelIO('onChangeBadge', (unreadCount: number) => {
      if (this.props.onChangeBadge) this.props.onChangeBadge(unreadCount);
    });

    // Register a callback when a user success to create a chat.
    (window as any).ChannelIO('onCreateChat', () => {
      if (this.props.onCreateChat) this.props.onCreateChat();
    });

    // Register a callback when a user success to change their profile in the settings page and chats.
    // `profile` is an object of the user's profile.
    (window as any).ChannelIO(
      'onChangeProfile',
      (profile: ChannelTalkUserProfile) => {
        if (this.props.onChangeProfile) this.props.onChangeProfile(profile);
      }
    );

    // Register a callback function when the chat list is hidden.
    (window as any).ChannelIO('onClickRedirect', (url: string) => {
      if (this.props.onClickRedirect) this.props.onClickRedirect(url);
    });
  }

  render() {
    return null;
  }
}
