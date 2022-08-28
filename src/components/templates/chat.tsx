/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useCallback, useEffect, useRef } from 'react';

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

  const scrollChat = useCallback(() => {
    if (chatView.current)
      chatView.current.scrollBy({
        top: chatView.current.scrollHeight,
        behavior: 'smooth',
      });
  }, [chatView]);

  useEffect(() => {
    listenMessage(gameKey, (message) => {
      console.log('listen Message on Chat Component');
      console.log(message);
      if (message.type === 'hint') {
        setTimeout(() => {
          scrollChat();
        }, 400);
      }
      if (message.type === 'answer' && message.matched) {
        document.body.classList.add('matched');
        setTimeout(() => {
          document.body.style.backgroundColor = gameColor;
          document
            .querySelector("meta[name='theme-color']")
            ?.setAttribute('content', gameColor);
        }, 10);
        setTimeout(() => {
          document.body.classList.remove('matched');
          document.body.style.backgroundColor = 'var(--bg-color)';
          document
            .querySelector("meta[name='theme-color']")
            ?.setAttribute('content', '#f2efe2');
        }, 800);
        setTimeout(() => {
          scrollChat();
        }, 900);
      }
      dispatch(pullMessage(message));
    });
  }, [gameKey, gameColor, scrollChat, dispatch, pullMessage]);

  useEffect(() => {
    setTimeout(() => {
      scrollChat();
    }, 150);
  }, [messages, scrollChat]);

  const bg = isDuringGame ? gameColor : 'var(--bg-color)';

  const matchedName = messages.find(
    (msg) => msg.type === 'answer' && msg.matched,
  );

  return (
    <>
      <div className="matchedtext">
        <span
          css={css`
            font-size: 0.7em;
            letter-spacing: 0;
          `}
        >
          {matchedName?.type === 'answer' && matchedName.name}
        </span>
        <br />
        あたり！
      </div>
      <div
        ref={chatView}
        className="chat"
        data-active={isDuringGame}
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
            width: 140px;
            transform: translateY(-80px);
            transition: 0.2s;
            animation: 1s ease 0s 1 normal fadein;
          }

          & > :first-of-type {
            margin-top: auto !important;
          }
        `}
      >
        {messages.map((message: MessageObject) => (
          <Message message={message} />
        ))}
      </div>
    </>
  );
};

export default Chat;
