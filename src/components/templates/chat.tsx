/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

import { MessageObject } from 'data/types';
import Message from 'components/molecules/message';
import { listenMessage } from 'utils/database';

const Chat: FC = () => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const chatView = useRef<HTMLDivElement>(null);

  const messages = useSelector((state: RootState) => state.game.messages);
  const dispatch = useDispatch();
  const { pullMessage } = gameSlice.actions;

  useEffect(() => {
    listenMessage(gameKey, (message) => {
      console.log('listen Message on Chat Component');
      console.log(message);
      dispatch(pullMessage(message));
    });
  }, [gameKey, dispatch, pullMessage]);

  useEffect(() => {
    if (chatView.current)
      chatView.current.scrollBy({
        top: chatView.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [messages]);

  const bg = isDuringGame ? gameColor : 'var(--bg-color)';

  return (
    <div
      ref={chatView}
      css={css`
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
          background: linear-gradient(0deg, transparent, ${bg});
          height: 80px;
          display: block;
          min-width: 140px;
          width: 33%;
          transform: translateY(-80px);
          transition: 0.2s;
          animation: 1s ease 0s 1 normal fadein;
        }

        & > :first-child {
          margin-top: auto !important;
        }
      `}
    >
      {messages.map((message: MessageObject) => (
        <Message message={message} />
      ))}
    </div>
  );
};

export default Chat;
