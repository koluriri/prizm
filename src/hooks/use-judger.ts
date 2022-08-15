import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { deleteGame, pushMessage } from 'utils/database';
import useUserName from 'hooks/use-username';
import { modesScore, localScoreKey } from 'data/types';

const useJudger = (): [(inputValue: string) => void] => {
  const userName = useUserName();

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameAnswer = useSelector(
    (state: RootState) => state.game.entity?.answer,
  );

  const gameObj = useSelector((state: RootState) => state.game.entity);
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  const messages = useSelector((state: RootState) => state.game.messages);
  const allRemains = useSelector((state: RootState) => state.game.allRemains);

  const judge = (inputValue: string) => {
    if (gameAnswer !== inputValue) {
      const answerLength =
        messages.filter(
          (message) => message.type === 'answer' && message.matched === false,
        ).length + 1;
      if (answerLength === allRemains) {
        console.log('Prizmの勝ち');
        deleteGame(gameKey);
      }
    }

    pushMessage(gameKey, {
      name: userName,
      type: 'answer',
      matched: gameAnswer === inputValue,
      value: inputValue,
    });

    if (gameObj && gameAnswer === inputValue) {
      const score = Math.round(
        modesScore[gameObj.mode](
          100 - (100 / gameObj.questions.length) * (currentQuesIndex - 1),
        ),
      );

      const localScore = localStorage.getItem(localScoreKey);
      const setValue = String(
        localScore ? parseInt(localScore, 10) + score : score,
      );
      localStorage.setItem(localScoreKey, setValue);

      pushMessage(gameKey, {
        type: 'score',
        value: `${userName}さんのあたり！スコア+${score}`,
      });
      deleteGame(gameKey);
    }
  };

  return [judge];
};
export default useJudger;
