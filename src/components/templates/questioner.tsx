/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useRef, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

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

  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );
  const dispatch = useDispatch();
  const { proceedQuesIndex } = gameSlice.actions;

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  useEffect(() => {
    if (isDuringGame) {
      const timerSeconds = 1.5;
      timerId.current = setInterval(
        () => dispatch(proceedQuesIndex()),
        timerSeconds * 1000,
      );
    }

    return clearTimer;
  }, [isDuringGame, dispatch, proceedQuesIndex]);

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
