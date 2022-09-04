import { useEffect } from 'react';
import { listenGameDeleted } from 'utils/database';
import { getSummary, updateSummaryFromKey } from 'utils/summary';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import useFinishGame from 'modules/game/use-finishgame';
import { gameTimerSeconds } from 'utils/types';

const useGameStarted = () => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);

  const finishGame = useFinishGame();

  useEffect(() => {
    listenGameDeleted(gameKey, () => {
      const summary = getSummary();
      if (summary && summary.lastPlay !== summary.lastWon) {
        updateSummaryFromKey('currentStreak', 0);
      }
      finishGame(true);
    });

    document.body.classList.add('ready');
    document.body.style.backgroundColor = gameObj?.color ?? 'var(--bg-color)';
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute('content', gameObj?.color ?? '#f2efe2');
    setTimeout(() => {
      document.body.classList.remove('ready');
    }, gameTimerSeconds * 3 * 1000);

    return () => {
      if (!!gameObj?.created && Date.now() - gameObj.created < 1000) {
        finishGame(false, true);
        alert('エラー：複数のゲームが同時に開始されました。やり直してください');
      } else {
        finishGame();
      }
    };
  }, [gameKey, gameObj, finishGame]);

  return finishGame;
};

export default useGameStarted;
