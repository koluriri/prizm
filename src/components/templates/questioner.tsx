/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useRef, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';
import { modesConvert, modesDetail } from 'data/types';
import { pushMessage } from 'utils/database';

import hokkaido from 'assets/preview-hokkaido.svg';

const Questioner: FC<{
  finishGame: () => void;
}> = ({ finishGame }) => {
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const gameKey = useSelector((state: RootState) => state.game.key);
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
      pushMessage(gameKey, {
        type: 'end',
        value: '誰も答えられませんでした。',
      });
      finishGame();
      clearTimer();
    }
  }, [currentQuesIndex, gameObj, gameKey, finishGame]);

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
        grid-area: questioner;
        width: 100%;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      {isDuringGame && (
        <div
          css={css`
            font-size: 15px;
            font-weight: 700;
            text-align: center;
          `}
        >
          {gameObj && modesDetail[gameObj.mode]}
        </div>
      )}

      {isDuringGame && displayQuestion && (
        <BigQuestion displayQuestion={displayQuestion} />
      )}

      {!isDuringGame && (
        <>
          <h3
            css={css`
              font-size: 38px;
              text-align: center;
              letter-spacing: 1px;
              font-weight: 700;
              margin-top: 0;
              margin-bottom: 10px;
            `}
          >
            {gameObj?.answer}
            <span
              css={css`
                display: block;
                font-weight: 700;
                font-size: 13px;
                letter-spacing: 4px;
                margin-top: 5px;
                color: ${gameObj?.color};
              `}
            >
              AOMORI
            </span>
          </h3>
          <img
            src={hokkaido}
            alt="北海道"
            css={css`
              max-width: 200px;
            `}
          />
        </>
      )}

      {displayQuestions && (
        <QuestionList questions={displayQuestions} current={currentQuesIndex} />
      )}
    </div>
  );
};

export default Questioner;
