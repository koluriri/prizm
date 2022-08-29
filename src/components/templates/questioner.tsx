/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC, useRef, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';
import { modesConvert, modesDetail } from 'data/types';
import { pushMessage } from 'utils/database';
import { prefectureABC } from 'data/prefecture';

import Prefsvg from 'components/molecules/prefsvg';
import Ztext from 'react-ztext';

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
      className="questioner"
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
              letter-spacing: -1px;
              font-weight: 700;
              margin-top: 0;
              margin-bottom: 10px;

              @media (max-width: 374px) {
                font-size: 28px;
              }

              @media (min-width: 768px) {
                letter-spacing: 1px;
              }
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
              {!!gameObj?.answer && prefectureABC[gameObj.answer]}
            </span>
          </h3>
          {!!gameObj?.answer && (
            <div
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                & > div > span {
                  animation: 8s linear 0s infinite alternate ${keyframes`
                    0% {
                      transform: rotateY(-50deg);
                    }
                    100% {
                      transform: rotateY(50deg);
                    }
                  `};
                }

                & > div > span > span:last-of-type {
                  filter: drop-shadow(3px 10px 16px rgba(50, 8, 10, 0.1));
                }

                & > div > span > span:not(:first-of-type) {
                  filter: brightness(0.72);
                }

                & svg {
                  max-height: 26vh;
                  width: 100%;
                  padding: 10px;

                  & > *:not(defs) {
                    animation: 1s ease 0.7s 1 both ${keyframes`
                      0% {
                        opacity:0;
                        transform: translateY(220px);
                      }
                      1% {
                        opacity:1;
                      }
                      45% {
                        transform: translateY(-70px);
                      }
                      55% {
                        transform: translateY(0);
                      }
                      75% {
                        transform: translateY(-25px);
                      }
                      85% {
                        transform: translateY(0);
                      }
                      93% {
                        transform: translateY(-10px);
                      }
                      100% {
                        transform: translateY(0);
                      }
                    `};

                    &:nth-of-type(2n) {
                      animation-delay: 0.8s;
                      transform: translateZ(2000px);
                    }
                    &:nth-of-type(5n) {
                      animation-delay: 0.9s;
                    }
                  }
                }
              `}
            >
              <Ztext
                depth="70px"
                direction="both"
                event="none"
                eventRotation="30deg"
                eventDirection="default"
                fade={false}
                perspective="270px"
                layers={20}
              >
                <Prefsvg name={gameObj.answer} />
              </Ztext>
            </div>
          )}
        </>
      )}

      {displayQuestions && (
        <QuestionList questions={displayQuestions} current={currentQuesIndex} />
      )}
    </div>
  );
};

export default Questioner;
