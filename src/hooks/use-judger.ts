import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import { deleteGame, pushMessage } from 'utils/database';
import {
  modesScore,
  localScoreKey,
  localUserNameKey,
  MessageNoticeObj,
} from 'data/types';
import getHint from 'utils/gethint';
import { initialUserName } from 'ducks/user';
import { getSummary, updateSummary } from 'utils/summary';

const useJudger = (): ((inputValue: string) => boolean) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

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
    let hintMessage = '';
    let end = false;
    if (gameAnswer !== inputValue) {
      const answerLength =
        messages.filter(
          (message) => message.type === 'answer' && message.matched === false,
        ).length + 1;

      if (answerLength === allRemains) {
        end = true;
        deleteGame(gameKey);
      } else {
        hintMessage = getHint((answerLength / allRemains) * 100, gameAnswer);
      }
    }

    pushMessage(gameKey, {
      name: userName,
      type: 'answer',
      matched: gameAnswer === inputValue,
      value: inputValue,
    });
    if (hintMessage !== '')
      pushMessage(gameKey, { type: 'hint', value: hintMessage });
    if (end)
      pushMessage(gameKey, {
        type: 'end',
        value: '誰も答えられませんでした',
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

      const notice: MessageNoticeObj = { a_score: score };

      const summary = getSummary();
      if (summary) {
        const currentStreak = summary.currentStreak + 1;
        const maxStreak =
          currentStreak > summary.maxStreak ? currentStreak : summary.maxStreak;
        if (currentStreak > 1) notice.c_update_streak = currentStreak;
        if (currentStreak > summary.maxStreak)
          notice.d_update_max_streak = currentStreak;

        const speed =
          Math.round(((Date.now() - gameObj.created) / 1000) * 10) / 10;
        const averageSpeed =
          summary.averageSpeed === 0
            ? speed
            : Math.round(
                ((summary.averageSpeed * (summary.playCount - 1) + speed) /
                  summary.playCount) *
                  10,
              ) / 10;
        const fastestSpeed =
          speed < summary.fastestSpeed || summary.fastestSpeed === 0
            ? speed
            : summary.fastestSpeed;
        if (speed < summary.fastestSpeed || summary.fastestSpeed === 0)
          notice.b_update_fastest = speed;

        updateSummary({
          wonCount: summary.wonCount + 1,
          lastWon: gameObj.created,
          currentStreak,
          maxStreak,
          averageSpeed,
          fastestSpeed,
        });
      }

      pushMessage(gameKey, {
        type: 'score',
        value: `${userName}:`,
        notice,
      });
      deleteGame(gameKey);
    }

    return gameAnswer === inputValue;
  };

  return judge;
};
export default useJudger;
