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
    window.scrollTo(0, 0);
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
      css={css(`
      background:${gameObj?.color ?? 'var(--bg-color)'};
      height: ${gameHeight}px;
      display: flex;
      justify-content: center;
      align-items: center;
    `)}
    >
      <div
        css={css(`
          height: ${gameHeight - 20}px;
          max-height: 600px;
          padding: 0 30px;
          width: 730px;
          max-width: 100vw;
          display: grid;
          grid-template-columns: 1fr minmax(140px, 40%);
          grid-template-rows: 1fr 80px;
        `)}
      >
        <Questioner finishGame={() => finishGame()} />
        <Chat />
        <AnswerInput setHome={setHome} />
      </div>
    </div>
  );
};

export default Game;
