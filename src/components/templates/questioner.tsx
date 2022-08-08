/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useRef, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';
import { modesConvert, modesDisplay } from 'data/types';

const Questioner: FC<{
  finishGame: () => void;
}> = ({ finishGame }) => {
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const [currentQuesIndex, setCurrentQuesIndex] = useState(1);

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  useEffect(() => {
    if (isDuringGame) {
      const timerSeconds = 1.5;
      timerId.current = setInterval(
        () => setCurrentQuesIndex((i) => i + 1),
        timerSeconds * 1000,
      );
    }

    return clearTimer;
  }, [isDuringGame]);

  // currentQuesIndexが変わるたびに実行。全部回したら負け処理
  useEffect(() => {
    if (
      gameObj &&
      currentQuesIndex === gameObj.questions.length &&
      gameObj.questions.length !== 0
    ) {
      console.log('Prizmの勝ち。');
      finishGame();
      clearTimer();
    }
  }, [currentQuesIndex, gameObj, finishGame]);

  const displayQuestions =
    gameObj &&
    gameObj.questions.map((question) =>
      isDuringGame
        ? modesConvert[gameObj.mode](question)
        : modesConvert.easy(question),
    );
  const displayQuestion =
    displayQuestions && displayQuestions[currentQuesIndex - 1];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
      `}
    >
      <div>{gameObj && modesDisplay[gameObj.mode]}</div>

      {isDuringGame && displayQuestion && (
        <BigQuestion displayQuestion={displayQuestion} />
      )}

      {displayQuestions && (
        <QuestionList questions={displayQuestions} current={currentQuesIndex} />
      )}
    </div>
  );
};

export default Questioner;
