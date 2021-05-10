import React, { useEffect, useCallback } from 'react';
import { ChannelIO } from './ChannelIO';
import { ReactChannelIOContext } from './context';
import {
  createChannelIOEventDispatcher,
  REACT_CHANNELIO_EVENT_METHODS,
} from './events';
import { scriptInjector, useCallbackProp, warnLogger } from './utils';
import type {
  ChannelIOApiShutdownMethodArgs,
  ChannelIOBootOption,
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
  /** Emitted when booted. */
  onBoot?: (err?: any, user?: ChannelIOUser) => void;
}

/** URL of ChannelIO SDK. */
const PLUGIN_URL = 'https://cdn.channel.io/plugin/ch-plugin-web.js';

export const ReactChannelIO: React.FC<ReactChannelIOProps> = ({
  children,
  autoBoot = false,
  autoBootTimeout = 1000,
  onBoot,
  ...channelIOBootOption
}) => {
  const onBootRef = useCallbackProp(onBoot);

  const [isBooted, setBooted] = React.useState(false);

  /**
   * Make ready before plug in init.
   * - ref: https://developers.channel.io/docs/web-installation
   */
  const createPluginQueue = () => {
    if (window.ChannelIO) {
      return;
    }

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
    ChannelIO('clearCallbacks');

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

        ChannelIO('boot', channelIOBootOption, (err, user) => {
          if (typeof onBootRef.current === 'function') {
            onBootRef.current(err, user);
          }

          if (err) {
            warnLogger('Error occurred while initalize ChannelIO', err);
            setBooted(false);
            reject(err);
            return;
          }

          setBooted(true);
          resolve(user as ChannelIOUser);
        });
      } catch (err) {
        reject(err);
      }
    });
  }, [channelIOBootOption, onBootRef]);

  /**
   * ### `shutdown`
   *
   * Shutdown channel plugin
   *
   * @link https://developers.channel.io/docs/web-channel-io#shutdown
   */
  const shutdown = useCallback((...args: ChannelIOApiShutdownMethodArgs) => {
    ChannelIO('clearCallbacks');
    ChannelIO('shutdown', ...args);
    setBooted(false);
  }, []);

  //
  // Bootstrap plugin.
  //
  useEffect(() => {
    void (async () => {
      createPluginQueue();
      await scriptInjector(PLUGIN_URL);

      if (autoBoot) {
        await new Promise(r => setTimeout(r, autoBootTimeout));
        await boot();
      }
    })();

    return () => {
      shutdown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactChannelIOContext.Provider value={{ isBooted, boot, shutdown }}>
      {children}
    </ReactChannelIOContext.Provider>
  );
};
