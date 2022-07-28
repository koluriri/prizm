import { FC } from 'react';

import BigQuestion from 'components/organisms/bigquestion';
import QuestionList from 'components/organisms/questionlist';

const modes = [
  'easy',
  'normal',
  'difficult',
  'station',
  'cape',
  'peninsula',
] as const;
export type Mode = typeof modes[number];

const Questioner: FC<{
  mode: Mode;
  questions: string[];
  // eslint-disable-next-line react/require-default-props
  isAnswered?: boolean;
}> = ({ mode, questions, isAnswered = false }) => {
  console.log(mode, isAnswered);
  const displayText = 'ひ';
  const current = 4;

  return (
    <div className="questioner">
      <BigQuestion displayText={displayText} />
      <QuestionList questions={questions} current={current} />
    </div>
  );
};

export default Questioner;
