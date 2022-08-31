import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { deleteGame, pushMessage } from 'utils/database';
import { localUserNameKey } from 'data/types';
import getHint from 'utils/gethint';
import { initialUserName } from 'ducks/user';
import { getNoticesWhenMatched } from 'utils/summary';
import useUserScore from './use-userscore';

const useJudger = (): ((inputValue: string) => boolean) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const gameAnswer = gameObj?.answer;
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  const messages = useSelector((state: RootState) => state.game.messages);
  const allRemains = useSelector((state: RootState) => state.game.allRemains);

  const updateScore = useUserScore();

  const judge = (
    inputValue: string,
  ): [isMatched: boolean, hintMessage: string, isEnd: boolean] => {
    const isMatched = gameAnswer === inputValue;

    if (!isMatched) {
      const answerLength =
        messages.filter(
          (message) => message.type === 'answer' && message.matched === false,
        ).length + 1;

      if (answerLength === allRemains) {
        deleteGame(gameKey);

        return [isMatched, '', true];
      }

      return [
        isMatched,
        getHint((answerLength / allRemains) * 100, gameAnswer),
        false,
      ];
    }

    return [isMatched, '', false];
  };

  const judgeAndPush = (inputValue: string) => {
    const [isMatched, hintMessage, end] = judge(inputValue);

    pushMessage(gameKey, {
      name: userName,
      type: 'answer',
      matched: isMatched,
      value: inputValue,
    });
    if (hintMessage !== '')
      pushMessage(gameKey, { type: 'hint', value: hintMessage });
    if (end)
      pushMessage(gameKey, {
        type: 'end',
        value: '誰も答えられませんでした',
      });

    if (gameObj && isMatched) {
      pushMessage(gameKey, {
        type: 'score',
        value: `${userName}:`,
        notice: {
          a_score: updateScore(
            gameObj.mode,
            gameObj.questions.length,
            currentQuesIndex,
          ),
          ...getNoticesWhenMatched(gameObj.created),
        },
      });
      deleteGame(gameKey);
    }

    return isMatched;
  };

  return judgeAndPush;
};

export default useJudger;
