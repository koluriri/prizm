import { FC, useRef, useEffect, useState } from 'react';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';
import { GameObj, modesConvert, modesDisplay } from 'data/types';

const Questioner: FC<{
  gameKey: string;
  gameObj: GameObj;
  isDuringGame: boolean;
  finishGame: () => void;
}> = ({ gameKey, gameObj, isDuringGame, finishGame }) => {
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
      currentQuesIndex === gameObj.questions.length &&
      gameObj.questions.length !== 0
    ) {
      console.log('Prizmの勝ち。');
      finishGame();
      clearTimer();
    }
  }, [currentQuesIndex, gameObj.questions, gameKey, finishGame]);

  const displayQuestions = gameObj.questions.map((question) =>
    isDuringGame
      ? modesConvert[gameObj.mode](question)
      : modesConvert.easy(question),
  );
  const displayQuestion = displayQuestions[currentQuesIndex - 1];

  return (
    <div className="questioner">
      <div>{modesDisplay[gameObj.mode]}</div>

      {isDuringGame && <BigQuestion displayQuestion={displayQuestion} />}

      <QuestionList
        questions={displayQuestions}
        current={currentQuesIndex}
        isDuringGame={isDuringGame}
      />
    </div>
  );
};

export default Questioner;
