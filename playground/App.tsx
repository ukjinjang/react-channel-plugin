import React from 'react';
import { useChannelIOApi, useChannelIOEvent } from 'react-channel-plugin';
import styled from 'styled-components';

import AppHeader from './components/AppHeader';
import EventConsole from './components/EventConsole';
import FeatureSection from './components/FeatureSection';

const StyledMain = styled.main`
  margin-left: auto;
  margin-right: auto;
  padding: 2rem 0;
  width: 100%;
  max-width: 1140px;
`;

const StyledMainContent = styled.div`
  margin: 0 1rem;
`;

const StyledCustomLauncherAnchor = styled.a`
  color: #5e56f0;
  text-decoration: underline;
  cursor: pointer;
`;

const App: React.FC = () => {
  const [isBooted, setBooted] = React.useState(false);
  const [isCustomLauncherVisible, setCustomLauncherVisible] =
    React.useState(false);

  const {
    boot,
    shutdown,
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
  } = useChannelIOApi();

  useChannelIOEvent('onBoot', () => {
    setBooted(true);
  });

  React.useEffect(() => {
    if (isBooted) {
      setTimeout(() => setCustomLauncherVisible(true), 2000);
    } else {
      setCustomLauncherVisible(false);
    }
  }, [isBooted]);

  return (
    <StyledMain>
      <StyledMainContent>
        <AppHeader />

        <EventConsole />

        <FeatureSection
          title="boot"
          description="Boot up channel plugin(button) to make it ready to use"
          link="https://developers.channel.io/docs/web-channel-io#boot"
          isActionButtonDisabled={isBooted}
          onActionButtonClick={() => boot()}
        />

        <FeatureSection
          title="shutdown"
          description="Shutdown channel plugin"
          link="https://developers.channel.io/docs/web-channel-io#shutdown"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => {
            setBooted(false);
            shutdown();
          }}
        />

        <FeatureSection
          title="showMessenger"
          description="Show plugin messenger"
          link="https://developers.channel.io/docs/web-channel-io#showmessenger"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => showMessenger()}
        />

        <FeatureSection
          title="show"
          description="Show plugin messenger"
          link="https://developers.channel.io/docs/web-channel-io#show"
          deprecated
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => show()}
        />

        <FeatureSection
          title="hideMessenger"
          description="Hide plugin messenger"
          link="https://developers.channel.io/docs/web-channel-io#hidemessenger"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => hideMessenger()}
        />

        <FeatureSection
          title="hide"
          description="Hide plugin messenger"
          link="https://developers.channel.io/docs/web-channel-io#hide"
          deprecated
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => hide()}
        />

        <FeatureSection
          title="lounge"
          description="Go to the lounge view."
          link="https://developers.channel.io/docs/web-channel-io#lounge"
          deprecated
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => lounge()}
        />

        <FeatureSection
          title="openChat"
          description="Open a chat with the given chat id and message. If the given chat id exists, appropriate chat will be opened. If not, lounge will be opened. In this case, the message will be ignored. If chat id is empty and message is given, new chat will be opened and the given message will be put in the input box. In this case, the support bot will not run. if chat id and message is both empty, new chat will be opened."
          link="https://developers.channel.io/docs/web-channel-io#openchat"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() =>
            openChat('', 'Hi, this is a test message!')
          }
        />

        <FeatureSection
          title="track"
          description="Track an event"
          link="https://developers.channel.io/docs/web-channel-io#openchat"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => track('', {})}
        />

        <FeatureSection
          title="updateUser"
          description="Update user information."
          link="https://developers.channel.io/docs/web-channel-io#updateuser"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() =>
            updateUser({
              profile: {
                name: Math.random().toString(36).substr(2),
                email: `${Math.random().toString(36).substr(2)}@channel.io`,
                mobileNumber: `+8210${
                  Math.floor(Math.random() * 90000000) + 10000000
                }`,
              },
            })
          }
        />

        <FeatureSection
          title="addTags"
          description="Add tags."
          link="https://developers.channel.io/docs/web-channel-io#addtags"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => addTags([])}
        />

        <FeatureSection
          title="removeTags"
          description="Remove tags."
          link="https://developers.channel.io/docs/web-channel-io#removetags"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => removeTags([])}
        />

        <FeatureSection
          title="setPage"
          description="Set page to be used instead of canonical url."
          link="https://developers.channel.io/docs/web-channel-io#setpage"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => setPage('')}
        />

        <FeatureSection
          title="resetPage"
          description="Reset page data customized by developer."
          link="https://developers.channel.io/docs/web-channel-io#resetpage"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => resetPage()}
        />

        <FeatureSection
          title="showChannelButton"
          description="Show channel button."
          link="https://developers.channel.io/docs/web-channel-io#showchannelbutton"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => showChannelButton()}
        />

        <FeatureSection
          title="hideChannelButton"
          description="Hide channel button."
          link="https://developers.channel.io/docs/web-channel-io#hidechannelbutton"
          isActionButtonDisabled={!isBooted}
          onActionButtonClick={() => hideChannelButton()}
        />

        <FeatureSection
          title="bootOption.customLauncherSelector"
          description="Css selector for custom button. Use it with hideChannelButtonOnBoot set to true."
        >
          {isCustomLauncherVisible ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <StyledCustomLauncherAnchor
              className="playground-launcher"
              data-cy="custom-test-launcher"
            >
              Custom Launcher
            </StyledCustomLauncherAnchor>
          ) : (
            <span>Custom launcher is shown after plugin booted.</span>
          )}
        </FeatureSection>
      </StyledMainContent>
    </StyledMain>
  );
};

export default App;
