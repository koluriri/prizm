import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { deleteGame, pushMessage } from 'utils/database';
import useUserName from 'hooks/use-username';
import { modesScore } from 'data/types';

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

  const judge = (inputValue: string) => {
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

      pushMessage(gameKey, {
        type: 'score',
        value: `${userName}さんのあたり！スコアは${score}`,
      });
      deleteGame(gameKey);
    }
  };

  return [judge];
};
export default useJudger;
