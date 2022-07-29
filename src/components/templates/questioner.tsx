import { FC, useRef, useEffect, useState } from 'react';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';

const modes = ['easy', 'normal', 'hard', 'hell', 'station', 'cape'] as const;
export type Mode = typeof modes[number];

type modesConvert = {
  [key in Mode]: (t: string) => string;
};
const modesConvert: modesConvert = {
  easy: (t) => t,
  normal: (t) => t.substr(0, 2),
  hard: (t) => t.charAt(0),
  hell: (t) => t.charAt(1),
  station: (t) => t,
  cape: (t) => t,
};

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
  // 初回マウントでタイマーセット
  useEffect(() => {
    setCurrentQuesIndex(1);
    timerId.current = setInterval(questionMover, timerSeconds * 1000);

    return clearTimer;
  }, [questions]);

  const displayQuestions = questions.map((question) =>
    isDuringGame ? modesConvert[mode](question) : modesConvert.easy(question),
  );
  const displayQuestion = displayQuestions[currentQuesIndex - 1];

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
