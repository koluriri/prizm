/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

import { listenGameDeleted, deleteGame } from 'utils/database';

import Questioner from 'components/templates/questioner';
import Chat from 'components/templates/chat';
import AnswerInput from 'components/templates/answerinput';

const Game: FC<{
  setHome: () => void;
}> = ({ setHome }) => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const dispatch = useDispatch();
  const { stopGame } = gameSlice.actions;

  const finishGame = useCallback(
    (isDeleted = false) => {
      if (!isDeleted) deleteGame(gameKey);
      dispatch(stopGame());
    },
    [gameKey, dispatch, stopGame],
  );

  useEffect(() => {
    listenGameDeleted(gameKey, () => finishGame(true));

    console.log('------');
    console.log('game started!');
    console.log(gameObj && `answer: ${gameObj.answer}`);
    console.log(`questions: `);
    console.log(gameObj && gameObj.questions);
    console.log('------');

    return () => finishGame();
  }, [gameKey, gameObj, finishGame]);

  const [gameHeight, setGameHeight] = useState(visualViewport.height);

  const onWindowResize = () => {
    setGameHeight(visualViewport.height);
  };
  useEffect(() => {
    window.visualViewport.addEventListener('resize', onWindowResize);

    return () => {
      window.visualViewport.removeEventListener('resize', onWindowResize);
    };
  });

  return (
    <div
      css={css({
        height: gameHeight - 20,
        maxHeight: '700px',
        transition: '0.2s height',
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        gridTemplateRows: '1fr 80px',
      })}
    >
      <Chat />
      <Questioner finishGame={() => finishGame()} />
      <AnswerInput setHome={setHome} />
    </div>
  );
};

export default Game;
