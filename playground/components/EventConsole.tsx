import React from 'react';
import { useChannelIOEvent } from 'react-channel-plugin';
import styled from '@emotion/styled';

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
    return (...args: unknown[]) => {
      const newLog = `[${name}] - ${JSON.stringify(args, null, 2)}`;
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
  useChannelIOEvent('onFollowUpChanged', handleLog('onFollowUpChanged'));
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
