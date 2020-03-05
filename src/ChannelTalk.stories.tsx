import React from 'react';
import {
  withKnobs,
  boolean,
  select,
  text,
  object,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ChannelTalk } from './ChannelTalk';

export default {
  title: 'ChannelTalk',
  component: ChannelTalk,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Channel Talk wrapper for React.',
  },
};

export const Default = () => {
  const pluginKey = text('pluginKey', '');
  const locale = select('locale', ['en', 'ko', 'ja'], 'en');
  const hideDefaultLauncher = boolean('hideDefaultLauncher', true);
  const hideNavigationBarOnChatView = boolean(
    'hideNavigationBarOnChatView',
    false
  );
  const userId = text('userId', '12345678');
  const profile = object('profile', {
    name: 'Storybook User',
    email: 'storybook@channel.io',
    mobileNumber: '010-1234-5678',
  });

  return (
    <>
      <button onClick={() => ChannelTalk.show()}>Open</button>
      <button onClick={() => ChannelTalk.hide()}>Close</button>

      <ChannelTalk
        pluginKey={pluginKey}
        locale={locale}
        userId={userId}
        profile={profile}
        hideDefaultLauncher={hideDefaultLauncher}
        hideNavigationBarOnChatView={hideNavigationBarOnChatView}
        onBoot={action('onBoot')}
        onError={action('onError')}
        onShow={action('onShow')}
        onHide={action('onHide')}
        onChangeBadge={action('onChangeBadge')}
        onCreateChat={action('onCreateChat')}
        onChangeProfile={action('onChangeProfile')}
        onClickRedirect={action('onClickRedirect')}
      />
    </>
  );
};
