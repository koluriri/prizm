/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, FormEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import UserRemain from 'components/molecules/userremain';
import { deleteGame, pushMessage } from 'utils/database';
import useUserName from 'hooks/use-username';
import { modesScore } from 'data/types';

const AnswerInput: FC<{
  setHome: () => void;
}> = ({ setHome }) => {
  const userName = useUserName();

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameAnswer = useSelector(
    (state: RootState) => state.game.entity?.answer,
  );
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const gameObj = useSelector((state: RootState) => state.game.entity);
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  const [answerInputValue, setAnswerInputValue] = useState('');

  const answerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answerInputValue) {
      pushMessage(gameKey, {
        name: userName,
        type: 'answer',
        matched: gameAnswer === answerInputValue,
        value: answerInputValue,
      });
      setAnswerInputValue('');
      if (gameObj && gameAnswer === answerInputValue) {
        const score = Math.round(
          modesScore[gameObj.mode](
            100 - (100 / gameObj.questions.length) * (currentQuesIndex - 1),
          ),
        );

        pushMessage(gameKey, {
          type: 'score',
          value: `${userName}さんのあたり！スコアは${score}`,
        });
        deleteGame(gameKey);
      }
    }
  };

  const answerinput = css({ gridColumn: '1 / 3' });
  const formControl = css({
    width: '100%',
    border: '1px solid #ddd',
    padding: '8px 18px',
    fontSize: 'var(--font-size)',
    borderRadius: '8px',
    margin: '10px 0',
  });

  return (
    <div css={answerinput}>
      {isDuringGame ? (
        <>
          <UserRemain userId={1} />
          <form onSubmit={(e) => answerSubmit(e)}>
            <input
              type="text"
              css={formControl}
              value={answerInputValue}
              onChange={(e) => setAnswerInputValue(e.target.value)}
            />
          </form>
        </>
      ) : (
        <button type="button" onClick={() => setHome()}>
          おわる
        </button>
      )}
    </div>
  );
};

export default AnswerInput;
