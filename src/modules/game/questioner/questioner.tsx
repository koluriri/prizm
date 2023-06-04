/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { FinishGameFunction, modesConvert, modesDetail } from 'utils/types';
import useQuestionTimer from 'modules/game/questioner/use-questiontimer';

import BigQuestion from 'modules/game/questioner/bigquestion';
import QuestionList from 'modules/game/questioner/questionlistcontainer';
import AnswerDisplay from 'modules/game/questioner/answerdisplay';
import GameReady from 'modules/game/questioner/gameready';
import GameCancelOnReady from 'modules/game/questioner/gamecancelonready';

const Questioner: FC<{
  finishGame: FinishGameFunction;
}> = ({ finishGame }) => {
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  useQuestionTimer(finishGame);

  const displayQuestions =
    gameObj &&
    gameObj.questions.map((question) =>
      isDuringGame
        ? modesConvert[gameObj.mode](question)
        : modesConvert.easy(question),
    );

  const questionerContainer = css`
    grid-area: questioner;
    width: 100%;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  const modeDisp = css`
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    color: var(--black);
  `;

  return (
    <div className="questioner" css={questionerContainer}>
      {isDuringGame && (
        <div className="modedisp" css={modeDisp}>
          {!!gameObj && modesDetail[gameObj.mode]}
        </div>
      )}

      {!!gameObj && (
        <GameReady
          startBy={gameObj.startBy}
          mode={gameObj.mode}
          count={gameObj.users.length}
        />
      )}

      {isDuringGame && !!displayQuestions && (
        <BigQuestion
          mode={gameObj.mode}
          displayQuestion={
            currentQuesIndex - 1 > 2
              ? displayQuestions[currentQuesIndex - 1]
              : gameObj.questions[currentQuesIndex - 1]
          }
        />
      )}

      {!!gameObj && <GameCancelOnReady />}

      {!isDuringGame && !!gameObj?.answer && (
        <AnswerDisplay answer={gameObj.answer} color={gameObj.color} />
      )}

      {!!displayQuestions &&
        gameObj.mode !== 'veryveryhell' &&
        gameObj.mode !== 'veryveryveryhell' && (
          <QuestionList
            questions={displayQuestions}
            current={currentQuesIndex}
          />
        )}
      {!!displayQuestions &&
        !isDuringGame &&
        (gameObj.mode === 'veryveryhell' ||
          gameObj.mode === 'veryveryveryhell') && (
          <QuestionList
            questions={displayQuestions}
            current={currentQuesIndex}
          />
        )}
    </div>
  );
};

export default Questioner;
