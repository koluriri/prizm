import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';
import { listenMessage } from 'utils/database';

import useScrollDiv from 'hooks/use-scrolldiv';
import useMatchedAnimation from 'modules/game/chat/use-matchedanimation';

import MatchedText from 'modules/game/chat/chatcontainer.matchedtext';
import Chat from 'modules/game/chat/chatcontainer.chat';

const ChatContainer: FC = () => {
  const dispatch = useDispatch();
  const { pullMessage } = gameSlice.actions;

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameColor = useSelector(
    (state: RootState) => state.game.entity?.color ?? 'var(--bg-color)',
  );
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );
  const messages = useSelector((state: RootState) => state.game.messages);

  const [chatView, scrollChat] = useScrollDiv();
  const matchedAnimation = useMatchedAnimation(gameColor, scrollChat);

  useEffect(() => {
    listenMessage(gameKey, (message) => {
      if (message.type === 'hint') {
        setTimeout(() => scrollChat(), 500);
      }
      if (message.type === 'answer' && message.matched) {
        matchedAnimation();
      }

      dispatch(pullMessage(message));
      setTimeout(() => scrollChat(), 150);
    });
  }, [gameKey, matchedAnimation, scrollChat, dispatch, pullMessage]);

  useEffect(() => {
    if (!isDuringGame) setTimeout(() => scrollChat(), 400);
  }, [isDuringGame, scrollChat]);

  return (
    <>
      <MatchedText messages={messages} />
      <Chat chatView={chatView} />
    </>
  );
};

export default ChatContainer;
