import React, { useCallback, useEffect, useRef } from 'react';

import { ChannelIO } from './ChannelIO';
import { ReactChannelIOContext } from './context';
import {
  createChannelIOEventDispatcher,
  REACT_CHANNELIO_EVENT_METHODS,
} from './events';
import {
  debugLogger,
  scriptInjector,
  useCallbackProp,
  useDeepEffect,
  warnLogger,
} from './utils';

import type {
  ChannelIOApiShutdownMethodArgs,
  ChannelIOBootOption,
  ChannelIOUpdateUserData,
  ChannelIOUser,
} from './ChannelIO';

/** Props of ReactChannelIO. */
export interface ReactChannelIOProps extends ChannelIOBootOption {
  /**
   * Indicates whether ChannelIO should be automatically booted or not.
   * If `true` no need to call `boot` manually.
   */
  autoBoot?: boolean;
  /**
   * Timeout before call `boot`.
   * Only work when `autoBoot` set as `true`.
   */
  autoBootTimeout?: number;
  /**
   * Need to reboot channel plugin when boot option changed?
   */
  rebootOnOptionChanged?: boolean;
  /**
   * Since ChannelIO does not support `customLauncherSelector` after plugin booted,
   * add onClick event listener at element which has `customLauncherSelector`
   * whenever DOM tree mutated. (observed by `MutationObserver`)
   */
  useCustomLauncherSelectorTweak?: boolean;
  /**
   * Print debug logs via `console.debug`.
   * Set `false` when use plugin at production env.
   */
  verbose?: boolean;
  /**
   * Emitted when channel plugin booted.
   */
  onBoot?: (err?: any, user?: ChannelIOUser) => void;
}

/** URL of ChannelIO SDK. */
const PLUGIN_URL = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
/** Attribute name of custom launcher. */
const LAUNCHER_ATTR_NAME = 'data-channel-plugin';
/** Attribute value of custom launcher. */
const LAUNCHER_ATTR_VAL = 'launcher';

export const ReactChannelIO: React.FC<ReactChannelIOProps> = ({
  children,
  autoBoot = false,
  autoBootTimeout = 1000,
  rebootOnOptionChanged = true,
  useCustomLauncherSelectorTweak = true,
  verbose = false,
  onBoot,
  ...channelIOBootOption
}) => {
  const onBootRef = useCallbackProp(onBoot);

  const optionRef = useRef(channelIOBootOption);

  const [isBooted, setBooted] = React.useState(false);

  /**
   * Make ready before plug in init.
   * - ref: https://developers.channel.io/docs/web-installation
   */
  const createPluginQueue = () => {
    if (window.ChannelIO) {
      return;
    }

    debugLogger(verbose, 'Creating plugin queue...');

    const ch = function (...args: any[]) {
      ch.c(args);
    };

    ch.q = [] as any[];

    ch.c = function (args: any[]) {
      ch.q.push(args);
    };

    window.ChannelIO = ch;
  };

  /**
   * Add event callbacks that dispatching internal events.
   */
  const addPluginEventCallbacks = () => {
    REACT_CHANNELIO_EVENT_METHODS.forEach(method => {
      ChannelIO(method, createChannelIOEventDispatcher(method));
    });
  };

  /**
   * ### `boot`
   *
   * Boot up channel plugin(button) to make it ready to use
   *
   * @link https://developers.channel.io/docs/web-channel-io#boot
   *
   * @param option a Boot Option object contains informations to initialize Channel IO plugin
   */
  const boot = useCallback(async () => {
    return new Promise<ChannelIOUser>((resolve, reject) => {
      try {
        addPluginEventCallbacks();

        debugLogger(verbose, 'Booting plugin...');
        debugLogger(verbose, 'boot options =>', optionRef.current);

        ChannelIO('boot', optionRef.current, (err, user) => {
          if (typeof onBootRef.current === 'function') {
            onBootRef.current(err, user);
          }

          if (err) {
            warnLogger('Error occurred while boot plugin.', err);
            setBooted(false);
            reject(err);
            return;
          }

          //
          // === update user ===
          // Need to update user since channel plugin has limitation
          //

          const updateUserData: ChannelIOUpdateUserData = {};

          // Change user language, when user language of plugin different with option one.
          // User language won't change, if the user already created.
          // - ref: https://developers.channel.io/docs/mobile-models#bootconfig
          if (user?.language !== optionRef.current.language) {
            updateUserData.language = optionRef.current.language;
          }

          // Reset profile when `profile` set as `null`.
          if (optionRef.current.profile === null) {
            updateUserData.profile = null;
          }

          ChannelIO('updateUser', updateUserData, (err, updatedUser) => {
            if (err) {
              warnLogger('Fail to reset user information of plugin.');
              return;
            }

            debugLogger(verbose, 'User updated after booting', updatedUser);
          });

          //
          // === update user end ===
          //

          debugLogger(verbose, 'Booted');

          setBooted(true);
          resolve(user as ChannelIOUser);
        });
      } catch (err) {
        reject(err);
      }
    });
  }, [verbose, onBootRef]);

  /**
   * ### `shutdown`
   *
   * Shutdown channel plugin
   *
   * @link https://developers.channel.io/docs/web-channel-io#shutdown
   */
  const shutdown = useCallback(
    (...args: ChannelIOApiShutdownMethodArgs) => {
      debugLogger(verbose, 'Shuting down plugin...');
      ChannelIO('clearCallbacks');
      ChannelIO('shutdown', ...args);
      setBooted(false);
    },
    [verbose]
  );

  //
  // Bootstrap plugin.
  //
  useEffect(() => {
    debugLogger(
      verbose,
      'Bootstraping plugin...',
      '(Set verbose flag `false`, to remove these debugging logs)'
    );

    void (async () => {
      try {
        createPluginQueue();
        await scriptInjector(PLUGIN_URL, verbose);

        debugLogger(verbose, 'Auto boot flag set as', autoBoot);
        if (autoBoot) {
          await new Promise(r => setTimeout(r, autoBootTimeout));

          debugLogger(verbose, 'Auto Booting...');
          await boot().catch(() => void 0);
        }
      } catch (err) {
        warnLogger(
          'Error occurred at plugin boot processing on first mount.',
          err
        );
      }
    })();

    return () => {
      shutdown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  //
  //
  useEffect(() => {
    optionRef.current = channelIOBootOption;
  }, [channelIOBootOption]);

  //
  // Re-boot channel plugin when boot option changed.
  //
  useDeepEffect(() => {
    if (isBooted && rebootOnOptionChanged) {
      debugLogger(verbose, 'Rebooting since option has been changed...');
      void boot().catch(() => void 0);
    }
  }, [channelIOBootOption]);

  //
  // Since ChannelIO does not support `customLauncherSelector` after plugin booted,
  // add onClick event listener at element which has `customLauncherSelector`
  // whenever DOM tree mutated. (observed by `MutationObserver`)
  //
  useEffect(() => {
    const customLauncherSelector = channelIOBootOption.customLauncherSelector;
    if (!useCustomLauncherSelectorTweak || !customLauncherSelector) {
      return;
    }

    const observer = new MutationObserver(mutationsList => {
      mutationsList
        .filter(mutation => mutation.type === 'childList')
        .filter(mutation => mutation.target instanceof HTMLElement)
        .map(mutation =>
          (mutation.target as HTMLElement).querySelectorAll(
            customLauncherSelector
          )
        )
        .forEach(customLauncherEls =>
          Array.from(customLauncherEls)
            .filter(customLauncherEl => customLauncherEl instanceof HTMLElement)
            .forEach(customLauncherEl => {
              const el = customLauncherEl as HTMLElement;
              if (el.getAttribute(LAUNCHER_ATTR_NAME) === LAUNCHER_ATTR_VAL) {
                return;
              }

              el.setAttribute(LAUNCHER_ATTR_NAME, LAUNCHER_ATTR_VAL);
              el.addEventListener(
                'click',
                () => ChannelIO('showMessenger'),
                false
              );
            })
        );
    });

    observer.observe(document.body, {
      attributes: false,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [
    channelIOBootOption.customLauncherSelector,
    useCustomLauncherSelectorTweak,
  ]);

  //
  //
  //

  return (
    <ReactChannelIOContext.Provider value={{ isBooted, boot, shutdown }}>
      {children}
    </ReactChannelIOContext.Provider>
  );
};
