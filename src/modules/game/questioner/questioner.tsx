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
  `;

  return (
    <div className="questioner" css={questionerContainer}>
      {isDuringGame && (
        <div css={modeDisp}>{!!gameObj && modesDetail[gameObj.mode]}</div>
      )}

      {isDuringGame && !!displayQuestions && (
        <BigQuestion displayQuestion={displayQuestions[currentQuesIndex - 1]} />
      )}

      {!isDuringGame && !!gameObj?.answer && (
        <AnswerDisplay answer={gameObj.answer} color={gameObj.color} />
      )}

      {!!displayQuestions && (
        <QuestionList questions={displayQuestions} current={currentQuesIndex} />
      )}
    </div>
  );
};

export default Questioner;
