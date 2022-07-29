import { FC, useRef, useEffect, useState } from 'react';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';
import { Mode, modesConvert } from 'data/types';

const Questioner: FC<{
  mode: Mode;
  questions: string[];
  isDuringGame: boolean;
  finishGame: () => void;
}> = ({ mode, questions, isDuringGame, finishGame }) => {
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const questionMover = () => setCurrentQuesIndex((i) => i + 1);

  const timerSeconds = 1.5;

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  const displayQuestions = questions.map((question) =>
    isDuringGame ? modesConvert[mode](question) : modesConvert.easy(question),
  );
  const displayQuestion = displayQuestions[currentQuesIndex - 1];

  // 初回マウントでタイマーセット
  useEffect(() => {
    setCurrentQuesIndex(1);
    timerId.current = setInterval(questionMover, timerSeconds * 1000);

    return clearTimer;
  }, [questions]);

  // currentQuesIndexが変わるたびに実行。全部回したら負け処理
  useEffect(() => {
    if (currentQuesIndex === questions.length) {
      console.error('負け');
      finishGame();
      clearTimer();
    }
  }, [currentQuesIndex, questions, finishGame]);

  return (
    <div className="questioner">
      <div>初級モード</div>
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
