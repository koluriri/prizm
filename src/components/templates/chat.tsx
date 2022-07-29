/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useRef, useEffect } from 'react';

import Message, { MessageObject } from 'components/molecules/message';

const Chat: FC<{
  messages: MessageObject[];
}> = ({ messages }) => {
  const chatView = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatView.current)
      chatView.current.scrollBy({
        top: chatView.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages]);

  const chatViewStyle = css`
    height: calc(100vh - 105px);
    overflow-y: auto;
    margin-bottom: 18px;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div ref={chatView} css={chatViewStyle}>
      {messages.map((message: MessageObject) => (
        <Message message={message} />
      ))}
    </div>
  );
};

export default Chat;
