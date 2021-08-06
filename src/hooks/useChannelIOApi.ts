import { useCallback, useContext, useEffect, useRef } from 'react';

import { ChannelIO } from '../ChannelIO';
import { ReactChannelIOContext } from '../context';

import type {
  ChannelIOApiAddTagsMethodArgs,
  ChannelIOApiHideChannelButtonMethodArgs,
  ChannelIOApiHideMessengerMethodArgs,
  ChannelIOApiHideMethodArgs,
  ChannelIOApiLoungeMethodArgs,
  ChannelIOApiOpenChatMethodArgs,
  ChannelIOApiRemoveTagsMethodArgs,
  ChannelIOApiResetPageMethodArgs,
  ChannelIOApiSetPageMethodArgs,
  ChannelIOApiShowChannelButtonMethodArgs,
  ChannelIOApiShowMessengerMethodArgs,
  ChannelIOApiShowMethodArgs,
  ChannelIOApiTrackMethodArgs,
  ChannelIOApiUpdateUserMethodArgs,
  ChannelIOUser,
} from '../ChannelIO';

/**
 * Using ChannelIO apis through React hook.
 *
 * @link https://developers.channel.io/docs/web-channel-io
 */
export const useChannelIOApi = () => {
  const isBooted = useRef(false);
  const context = useContext(ReactChannelIOContext);
  if (!context) {
    throw new Error(
      'Oops, looks like you forgot Provider for ChannelIO hooks.'
    );
  }

  useEffect(() => {
    if (context.isBooted) {
      isBooted.current = context.isBooted;
    }
  }, [context.isBooted]);

  /**
   * ### `showMessenger`
   *
   * Show plugin messenger
   *
   * @link https://developers.channel.io/docs/web-channel-io#showmessenger
   */
  const showMessenger = useCallback(
    (...args: ChannelIOApiShowMessengerMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      ChannelIO('showMessenger', ...args);
    },
    []
  );

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
  const show = useCallback((...args: ChannelIOApiShowMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('show', ...args);
  }, []);

  /**
   * ### `hideMessenger`
   *
   * Hide plugin messenger
   *
   * @link https://developers.channel.io/docs/web-channel-io#hidemessenger
   */
  const hideMessenger = useCallback(
    (...args: ChannelIOApiHideMessengerMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      ChannelIO('hideMessenger', ...args);
    },
    []
  );

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
  const hide = useCallback((...args: ChannelIOApiHideMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('hide', ...args);
  }, []);

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
  const lounge = useCallback((...args: ChannelIOApiLoungeMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('lounge', ...args);
  }, []);

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
  const openChat = useCallback((...args: ChannelIOApiOpenChatMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('openChat', ...args);
  }, []);

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
  const track = useCallback((...args: ChannelIOApiTrackMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('track', ...args);
  }, []);

  /**
   * ### `updateUser`
   *
   * Update user information.
   *
   * @link https://developers.channel.io/docs/web-channel-io#updateuser
   */
  const updateUser = useCallback(
    async (...args: ChannelIOApiUpdateUserMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      return new Promise<ChannelIOUser>((resolve, reject) => {
        ChannelIO('updateUser', args[0], (err, user) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(user as ChannelIOUser);
        });
      });
    },
    []
  );

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
  const addTags = useCallback(
    async (...args: ChannelIOApiAddTagsMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      return new Promise<ChannelIOUser>((resolve, reject) => {
        ChannelIO('addTags', args[0], (err, user) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(user as ChannelIOUser);
        });
      });
    },
    []
  );

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
  const removeTags = useCallback(
    async (...args: ChannelIOApiRemoveTagsMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      return new Promise<ChannelIOUser>((resolve, reject) => {
        ChannelIO('removeTags', args[0], (err, user) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(user as ChannelIOUser);
        });
      });
    },
    []
  );

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
  const setPage = useCallback((...args: ChannelIOApiSetPageMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('setPage', ...args);
  }, []);

  /**
   * ### `resetPage`
   *
   * Reset page data customized by developer.
   *
   * If you call resetPage, page data will fill with canonical url .
   *
   * @link https://developers.channel.io/docs/web-channel-io#resetpage
   */
  const resetPage = useCallback((...args: ChannelIOApiResetPageMethodArgs) => {
    if (!isBooted.current) {
      return;
    }

    ChannelIO('resetPage', ...args);
  }, []);

  /**
   * ### `showChannelButton`
   *
   * Show channel button.
   *
   * @link https://developers.channel.io/docs/web-channel-io#showchannelbutton
   */
  const showChannelButton = useCallback(
    (...args: ChannelIOApiShowChannelButtonMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      ChannelIO('showChannelButton', ...args);
    },
    []
  );

  /**
   * ### `hideChannelButton`
   *
   * Hide channel button.
   *
   * @link https://developers.channel.io/docs/web-channel-io#hidechannelbutton
   */
  const hideChannelButton = useCallback(
    (...args: ChannelIOApiHideChannelButtonMethodArgs) => {
      if (!isBooted.current) {
        return;
      }

      ChannelIO('hideChannelButton', ...args);
    },
    []
  );

  return {
    boot: context.boot,
    shutdown: context.shutdown,
    showMessenger,
    show,
    hideMessenger,
    hide,
    lounge,
    openChat,
    track,
    updateUser,
    addTags,
    removeTags,
    setPage,
    resetPage,
    showChannelButton,
    hideChannelButton,
  };
};
