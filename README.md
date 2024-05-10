<img src="./playground/public/favicon.png" alt="Logo" height="100px" style="margin-top: 20px;"/>

# react-channel-plugin

![npm](https://img.shields.io/npm/v/react-channel-plugin)
[![CircleCI](https://circleci.com/gh/ukjinjang/react-channel-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/ukjinjang/react-channel-plugin/?branch=master)
[![codecov](https://codecov.io/gh/ukjinjang/react-channel-plugin/branch/master/graph/badge.svg?token=35WMEBXPPP)](https://codecov.io/gh/ukjinjang/react-channel-plugin)
[![Known Vulnerabilities](https://snyk.io/test/github/ukjinjang/react-channel-plugin/badge.svg)](https://snyk.io/test/github/ukjinjang/react-channel-plugin)
[![minzip](https://badgen.net/bundlephobia/minzip/react-channel-plugin)](https://bundlephobia.com/result?p=react-channel-plugin)
[![dependency-count](https://badgen.net/bundlephobia/dependency-count/react-channel-plugin)](https://bundlephobia.com/result?p=react-channel-plugin)
[![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/react-channel-plugin)](https://bundlephobia.com/result?p=react-channel-plugin)
![npm-download](https://img.shields.io/npm/dm/react-channel-plugin)
![license](https://img.shields.io/npm/l/react-channel-plugin)

[Channel IO](https://channel.io) (Channel Talk) plugin wrapper for React.

> If you want to use Channel IO plugin without React, please refer [channel-web-sdk-loader](https://github.com/channel-io/channel-web-sdk-loader).

## Installation

```bash
$ yarn add react-channel-plugin
```

## Getting started

Example code of react channel plugin.

```tsx
import React from 'react';
import {
  ReactChannelIO,
  useChannelIOApi,
  useChannelIOEvent,
} from 'react-channel-plugin';
import { CHANNEL_ID_PLUGIN_KEY } from './config';

const App = () => {
  return (
    <ReactChannelIO pluginKey={CHANNEL_ID_PLUGIN_KEY} language="en" autoBoot>
      <AppPage />
    </ReactChannelIO>
  );
};

const AppPage = () => {
  const { showMessenger } = useChannelIOApi();

  useChannelIOEvent('onShowMessenger', () => {
    console.log('Messenger opened!');
  });

  return (
    <button onClick={showMessenger}>
      <span>Open</span>
    </button>
  );
};
```

## API

React provider and hooks for Channel IO API.

### ReactChannelIO

`<ReactChannelIO />` is [React Context provider](https://reactjs.org/docs/context.html#contextprovider), which will provides context (APIs and event listeners) to react-channel-plugin hooks. Also it receives Channel IO plugin options and initialize Channel IO instance. Make sure place `<ReactChannelIO />` upper than hooks used at your app.

#### Props

```tsx
/**
 * Please refer ChannelIO offical docs.
 * - ref: https://developers.channel.io/docs/web-boot-option
 */
type ChannelIOBootOption = {};

interface ReactChannelIOProps extends ChannelIOBootOption {
  /**
   * Indicates whether ChannelIO should be automatically booted or not.
   * If `true` no need to call `boot` manually.
   *
   * - Default: `false`
   */
  autoBoot?: boolean;

  /**
   * Timeout before call `boot`.
   * Only work when `autoBoot` set as `true`.
   *
   * - Default: `1000`
   */
  autoBootTimeout?: number;

  /**
   * Need to reboot channel plugin when boot option changed?
   *
   * - Default: `true`
   */
  rebootOnOptionChanged?: boolean;

  /**
   * Since ChannelIO does not support `customLauncherSelector` after plugin booted,
   * add onClick event listener at element which has `customLauncherSelector`
   * whenever DOM tree mutated. (observed by `MutationObserver`)
   *
   * - Default: `true`
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
```

#### Example

```tsx
import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { CHANNEL_ID_PLUGIN_KEY } from './config';

const App = () => {
  const userProfile = { ... };

  return (
    <ReactChannelIO
      pluginKey={CHANNEL_ID_PLUGIN_KEY}
      language="en"
      profile={userProfile}
      autoBoot
      autoBootTimeout={2000}
    >
      <span>Child component of the ReactChannelIO</span>
    </ReactChannelIO>
  );
};
```

### useChannelIOApi

Provides API of Channel IO as React hook. Please refer [official docs](https://developers.channel.io/docs/web-channelio) to see detail description of each API.

- `boot`
- `shutdown`
- `showMessenger`
- `hideMessenger`
- `openChat`
- `openSupportBot`
- `track`
- `clearCallbacks`
- `updateUser`
- `addTags`
- `removeTags`
- `setPage`
- `resetPage`
- `showChannelButton`
- `hideChannelButton`
- `setAppearance`

#### Example

```tsx
import { useChannelIOApi } from 'react-channel-plugin';

const AppPage = () => {
  const { showMessenger, updateUser } = useChannelIOApi();

  return (
    <>
      <button onClick={showMessenger}>
        <span>Open</span>
      </button>

      <button
        onClick={() => {
          updateUser({
            profile: {
              name: 'John Doe',
              email: 'john.doe@example.com',
              mobileNumber: '+821012345678',
            },
          });
        }}
      >
        <span>Update user</span>
      </button>
    </>
  );
};
```

### useChannelIOEvent

Provides event callbacks from Channel IO as React hook. Provide callback method name as first parameter of hook method. Please refer [official docs](https://developers.channel.io/docs/web-channelio) to see detail description of each callback.


- `onShowMessenger`
- `onHideMessenger`
- `onBadgeChanged`
- `onChatCreated`
- `onFollowUpChanged`
- `onUrlClicked`

#### Example

```tsx
import { useChannelIOApi } from 'react-channel-plugin';

const AppPage = () => {
  useChannelIOEvent('onShowMessenger', () => {
    console.log('messenger opened!');
  });

  useChannelIOEvent('onFollowUpChanged', profile => {
    console.log('profile updated:', profile);
  });

  return null;
};
```

## Playground

Playground for react-channel-plugin.

[https://ukjinjang.github.io/react-channel-plugin](https://ukjinjang.github.io/react-channel-plugin)

## Unit Test

To run unit test components that use react-channel plugin's hook with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/), pass `ReactChannelIO` provider to [`wrapper`](https://testing-library.com/docs/react-testing-library/api#wrapper) option of [`render`](https://testing-library.com/docs/react-testing-library/api#render) method.

```tsx
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

// ...

render(<ComponentWithChannelHook {...props} />, {
  wrapper: ({ children }) => {
    return (
      <ReactChannelIO
        children={children}
        pluginKey={CHANNEL_ID_PLUGIN_KEY}
        {...pluginProps}
      />
    );
  },
});
```

## Brower compatibility

| Browser (last 2 versions) |      |
| ------------------------- | ---- |
| Google Chrome             | ✅   |
| MS Edge (Chromium)        | ✅   |
| Mozilla Firefox           | ✅   |
| Electron                  | ✅   |

## Issues

`react-channel-plugin` is a light-weight wrapper of [Channel IO JavaScript SDK](https://developers.channel.io/docs/web-installation). Because of this, the issue you're having likely isn't a react-channel-plugin issue, but an issue with Channel IO service itself. So please check it again, before submit new issue.
