import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

const QuestionList: FC<{
  questions: string[];
  // eslint-disable-next-line react/require-default-props
  current?: number;
}> = ({ questions, current = 0 }) => {
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  return (
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
};

export default QuestionList;
