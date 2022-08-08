/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { MessageObject, Messages } from 'data/types';
import Message from 'components/molecules/message';
import { listenMessage } from 'utils/database';

const Chat: FC = () => {
  const gameKey = useSelector((state: RootState) => state.game.key);

  const chatView = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    listenMessage(gameKey, (message) => {
      console.log('listen Message on Chat Component');
      console.log(message);
      setMessages((histories) => [...histories, message]);
    });
  }, [gameKey]);

  useEffect(() => {
    if (chatView.current)
      chatView.current.scrollBy({
        top: chatView.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages]);

  const chatViewStyle = css`
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
