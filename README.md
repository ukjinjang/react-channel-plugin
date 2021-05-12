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

## Installation

#### Installation via NPM

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
    <ReactChannelIO pluginKey={CHANNEL_ID_PLUGIN_KEY} locale="en" autoBoot>
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
      hideChannelButtonOnBoot={true}
      locale="en"
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

Provides API of Channel IO as React hook. Please refer [official docs](https://developers.channel.io/docs/web-channel-io) to see detail description of each API.

- `boot`
- `shutdown`
- `showMessenger`
- ~~`show`~~ (will be deprecated)
- `hideMessenger`
- ~~`hide`~~ (will be deprecated)
- ~~`lounge`~~ (will be deprecated)
- `openChat`
- `track`
- `clearCallbacks`
- `updateUser`
- `addTags`
- `removeTags`
- `setPage`
- `resetPage`
- `showChannelButton`
- `hideChannelButton`

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

Provides event callbacks from Channel IO as React hook. Provide callback method name as first parameter of hook method. Please refer [official docs](https://developers.channel.io/docs/web-channel-io) to see detail description of each callback.

- ~~`onBoot`~~ (will be deprecated)
- `onShowMessenger`
- ~~`onShow`~~ (will be deprecated)
- `onHideMessenger`
- ~~`onHide`~~ (will be deprecated)
- `onBadgeChanged`
- ~~`onChangeBadge`~~ (will be deprecated)
- `onChatCreated`
- ~~`onCreateChat`~~ (will be deprecated)
- `onProfileChanged`
- ~~`onChangeProfile`~~ (will be deprecated)
- `onUrlClicked`
- ~~`onClickRedirect`~~ (will be deprecated)

#### Example

```tsx
import { useChannelIOApi } from 'react-channel-plugin';

const AppPage = () => {
  useChannelIOEvent('onShowMessenger', () => {
    console.log('Messenger opened!');
  });

  useChannelIOEvent('onChangeProfile', user => {
    console.log('User updated:', user);
  });

  return null;
};
```

## Pure APIs

You can use Channel IO API wrapper without using React. Usages are same with [official API](https://developers.channel.io/docs/web-channel-io), but typed via TypeScript.

**WARNING: DO NOT USE with `<ReactChannelIO />`, because there is change to overrides attached callbacks of react-channel-plugin and which will cause malfunctioning.**

```ts
import { ChannelIO } from 'react-channel-plugin';

ChannelIO('boot');

ChannelIO('onChatCreated', () => {
  console.log('User chat created!');
});
```

## Playground

Playground for react-channel-plugin.

[https://ukjinjang.github.io/react-channel-plugin](https://ukjinjang.github.io/react-channel-plugin)

## Issues

`react-channel-plugin` is a light-weight wrapper of [Channel Talk JS SDK](https://developers.channel.io/docs/what-is-a-channel-plugin). Because of this, the issue you're having likely isn't a react-channel-plugin issue, but an issue with Channel Talk service itself. So please check it again, before submit new issue.
