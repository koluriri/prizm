/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState, useCallback } from 'react';

import { listenGameDeleted, deleteGame } from 'hooks/database';
import { GameObj } from 'data/types';

import Questioner from 'components/templates/questioner';
import Chat from 'components/templates/chat';
import AnswerInput from 'components/templates/answerinput';

const Game: FC<{
  setHome: () => void;
  gameKey: string;
  gameObj: GameObj;
}> = ({ setHome, gameKey, gameObj }) => {
  const [isDuringGame, setIsDuringGame] = useState(true);

  const finishGame = useCallback(
    (isWrote = false) => {
      if (!isWrote) deleteGame(gameKey);
      setIsDuringGame(false);
    },
    [gameKey],
  );

  useEffect(() => {
    listenGameDeleted(gameKey, () => finishGame(true));

    console.log('------');
    console.log('game started!');
    console.log(`answer: ${gameObj.answer}`);
    console.log(`questions: `);
    console.log(gameObj.questions);
    console.log('------');

    return () => finishGame();
  }, [gameKey, gameObj, finishGame]);

  console.log(`isDuringGame: `);
  console.log(isDuringGame);

  return (
    <div
      css={css({
        display: 'grid',
        gridTemplateColumns: '40% 60%',
      })}
    >
      <Chat gameKey={gameKey} />
      <Questioner
        gameKey={gameKey}
        gameObj={gameObj}
        isDuringGame={isDuringGame}
        finishGame={() => finishGame()}
      />
      <AnswerInput
        gameKey={gameKey}
        answer={gameObj.answer}
        isDuringGame={isDuringGame}
        setHome={setHome}
      />
    </div>
  );
};

export default Game;
