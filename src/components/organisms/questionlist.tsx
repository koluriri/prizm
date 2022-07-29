import { FC } from 'react';

const QuestionList: FC<{
  questions: string[];
  isDuringGame: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: number;
}> = ({ questions, isDuringGame, current = 0 }) => (
  <div>
    {questions.map((question, index) =>
      index < current || !isDuringGame ? (
        <span>{question} </span>
      ) : (
        <span>・</span>
      ),
    )}
  </div>
);

export default QuestionList;
