import React from 'react';
import { useChannelIOEvent } from 'react-channel-plugin';
import styled from 'styled-components';

const StyledEventConsole = styled.div`
  margin-bottom: 2rem;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  resize: vertical;
  height: 10rem;
`;

const EventConsole: React.FC = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [log, setLog] = React.useState('');

  const handleLog = (name: string) => {
    return (value?: any) => {
      const newLogValue =
        typeof value === 'undefined' || value === ''
          ? 'no message'
          : `${JSON.stringify(value, null, 2)}`;

      const newLog = `[${name}] - ${newLogValue}`;

      setLog(prev => (prev ? `${prev}\n\n${newLog}` : newLog));
    };
  };

  React.useEffect(() => {
    if (log && textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [log]);

  //
  //
  //

  useChannelIOEvent('onBoot', handleLog('onBoot'));
  useChannelIOEvent('onShowMessenger', handleLog('onShowMessenger'));
  useChannelIOEvent('onHideMessenger', handleLog('onHideMessenger'));
  useChannelIOEvent('onBadgeChanged', handleLog('onBadgeChanged'));
  useChannelIOEvent('onChatCreated', handleLog('onChatCreated'));
  useChannelIOEvent('onProfileChanged', handleLog('onProfileChanged'));
  useChannelIOEvent('onUrlClicked', handleLog('onUrlClicked'));

  //
  //
  //

  return (
    <StyledEventConsole>
      <StyledTextarea
        value={log}
        placeholder="Event logs display here..."
        readOnly
        data-cy="event-console"
        ref={textareaRef}
      />
    </StyledEventConsole>
  );
};

export default EventConsole;
