/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, RefObject } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { MessageObject } from 'utils/types';
import Message from 'components/organisms/message';

const Chat: FC<{
  chatView: RefObject<HTMLDivElement>;
}> = ({ chatView }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );
  const messages = useSelector((state: RootState) => state.game.messages);

  const chatContainer = css`
    grid-area: chat;
    overflow-y: auto;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-flow: column nowrap;
    padding-top: 80px;

    &::-webkit-scrollbar {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      /* top: 0; */
      background: linear-gradient(
        0deg,
        transparent,
        ${isDuringGame ? gameColor : 'var(--bg-color)'}
      );
      height: 80px;
      display: block;
      width: 140px;
      transform: translateY(-80px);
      transition: 0.2s;
      animation: 1s ease 0s 1 normal fadein;
    }

    & > :first-of-type {
      margin-top: auto !important;
    }
  `;

  return (
    <div
      ref={chatView}
      className="chat"
      data-active={isDuringGame}
      css={chatContainer}
    >
      {messages.map((message: MessageObject) => (
        <Message message={message} key={message.key ?? message.value} />
      ))}
    </div>
  );
};

export default Chat;
