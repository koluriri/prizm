import { FC } from 'react';

const QuestionList: FC<{
  questions: string[];
  // eslint-disable-next-line react/require-default-props
  current?: number;
}> = ({ questions, current = 0 }) => (
  <div>
    {questions.map((question) => (
      <span>{question}・</span>
    ))}
    <br />
    current: {current}
  </div>
);

export default QuestionList;
