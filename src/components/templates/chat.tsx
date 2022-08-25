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

  const chatViewStyle = css`
    overflow-y: auto;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    flex-flow: column nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    & > :first-child {
      margin-top: auto !important;
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
