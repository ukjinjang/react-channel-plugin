import React from 'react';
import {
  ReactChannelIOLauncher,
  useChannelIOApi,
  useChannelIOEvent,
} from 'react-channel-plugin';
import styled from '@emotion/styled';

import EventConsole from './components/EventConsole';
import FeatureSection from './components/FeatureSection';
import Header from './components/Header';

//
//
//

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

const StyledCustomLauncher = styled.button`
  padding: 0.5rem;
  border: 2px solid #000;
  border-radius: 0.5rem;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  font-weight: bold;
  transition: transform 1000ms ease-in-out;
  cursor: pointer;

  &[data-channelio-open='true'] {
    transform: rotate(180deg);
  }

  &:disabled {
    background: #ccc;
    border-color: #aaa;
  }
`;

//
//
//

const App: React.FC = () => {
  const [isBooted, setBooted] = React.useState(false);

  const {
    boot,
    shutdown,
    showMessenger,
    hideMessenger,
    openChat,
    openSupportBot,
    track,
    updateUser,
    addTags,
    removeTags,
    setPage,
    resetPage,
    showChannelButton,
    hideChannelButton,
    setAppearance,
  } = useChannelIOApi();

  useChannelIOEvent('onBoot', () => {
    setBooted(true);
  });

  return (
    <StyledMain>
      <StyledMainContent>
        <Header />

        <EventConsole />

        <FeatureSection
          title="boot"
          description="Initialize for the SDK."
          link="https://developers.channel.io/docs/web-channelio#boot"
          disabled={isBooted}
          onClick={() => void boot()}
        />

        <FeatureSection
          title="shutdown"
          description="Stops all SDK operations and initializes internal data."
          link="https://developers.channel.io/docs/web-channelio#shutdown"
          disabled={!isBooted}
          onClick={() => {
            setBooted(false);
            shutdown();
          }}
        />

        <FeatureSection
          title="showMessenger"
          description="Shows the messenger."
          link="https://developers.channel.io/docs/web-channelio#showmessenger"
          disabled={!isBooted}
          onClick={() => showMessenger()}
        />

        <FeatureSection
          title="hideMessenger"
          description="Hides the messenger."
          link="https://developers.channel.io/docs/web-channelio#hidemessenger"
          disabled={!isBooted}
          onClick={() => hideMessenger()}
        />

        <FeatureSection
          title="openChat"
          description="Opens a chat."
          link="https://developers.channel.io/docs/web-channelio#openchat"
          disabled={!isBooted}
          onClick={() => openChat('', 'Hi, this is a test message!')}
        />

        <FeatureSection
          title="openSupportBot"
          description="Opens a chat and initiates a specific support bot. (won't work since demo account is not paid account)"
          link="https://developers.channel.io/docs/web-channelio#openchat"
          disabled={!isBooted}
          onClick={() =>
            openSupportBot('101816', 'Hi, this is a test message!')
          }
        />

        <FeatureSection
          title="track"
          description="Tracks an event."
          link="https://developers.channel.io/docs/web-channelio#openchat"
          disabled={!isBooted}
          onClick={() => track('', {})}
        />

        <FeatureSection
          title="updateUser"
          description="Update a user’s information."
          link="https://developers.channel.io/docs/web-channelio#updateuser"
          disabled={!isBooted}
          onClick={() =>
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
          description="Adds a user’s tags."
          link="https://developers.channel.io/docs/web-channelio#addtags"
          disabled={!isBooted}
          onClick={() => addTags([])}
        />

        <FeatureSection
          title="removeTags"
          description="Removes a user’s tags."
          link="https://developers.channel.io/docs/web-channelio#removetags"
          disabled={!isBooted}
          onClick={() => removeTags([])}
        />

        <FeatureSection
          title="setPage"
          description="Set the page. Page can be used instead of canonical URL."
          link="https://developers.channel.io/docs/web-channelio#setpage"
          disabled={!isBooted}
          onClick={() => setPage('')}
        />

        <FeatureSection
          title="resetPage"
          description="Reset the page value set by setPage. When resetPage is used, the canonical URL will be used as the page value."
          link="https://developers.channel.io/docs/web-channelio#resetpage"
          disabled={!isBooted}
          onClick={() => resetPage()}
        />

        <FeatureSection
          title="showChannelButton"
          description="Show the channel button."
          link="https://developers.channel.io/docs/web-channelio#showchannelbutton"
          disabled={!isBooted}
          onClick={() => showChannelButton()}
        />

        <FeatureSection
          title="hideChannelButton"
          description="Hides the channel button."
          link="https://developers.channel.io/docs/web-channelio#hidechannelbutton"
          disabled={!isBooted}
          onClick={() => hideChannelButton()}
        />

        <FeatureSection
          title="setAppearance"
          description="Set the appearance of the theme. (randomly change the theme for demo purpose)"
          link="https://developers.channel.io/docs/web-channelio#setappearance"
          disabled={!isBooted}
          onClick={() =>
            setAppearance(
              (['dark', 'light'] as const)[Math.floor(Math.random() * 2)]
            )
          }
        />

        <FeatureSection
          title="bootOption.customLauncherSelector"
          description="Css selector for custom button. Use it with hideChannelButtonOnBoot set to true."
        >
          {isBooted ? (
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

        <FeatureSection
          title="<ReactChannelIOLauncher />"
          description="React component for custom Channel messenger launcher."
        >
          <ReactChannelIOLauncher>
            {({ isBooted, isOpen, toggle }) => (
              <StyledCustomLauncher
                data-channelio-open={isOpen}
                disabled={!isBooted}
                onClick={toggle}
              >
                Open Channel Messenger
              </StyledCustomLauncher>
            )}
          </ReactChannelIOLauncher>
        </FeatureSection>
      </StyledMainContent>
    </StyledMain>
  );
};

export default App;
