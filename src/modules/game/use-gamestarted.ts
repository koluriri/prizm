import { useEffect } from 'react';
import { listenGameDeleted, logPageView } from 'utils/database';
import { getSummary, updateSummaryFromKey } from 'utils/summary';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import useFinishGame from 'modules/game/use-finishgame';
import { gameTimerSeconds } from 'utils/types';

const useGameStarted = () => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);

  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );

  const finishGame = useFinishGame();

  useEffect(() => {
    listenGameDeleted(gameKey, () => {
      const summary = getSummary();
      if (summary && summary.lastPlay !== summary.lastWon) {
        updateSummaryFromKey('currentStreak', 0);
      }
      finishGame(true);
    });

    if (isDuringGame) {
      logPageView('game');
      document.body.classList.add('ready');
      document.body.style.backgroundColor = gameObj?.color ?? 'var(--bg-color)';
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute('content', gameObj?.color ?? '#f2efe2');
      setTimeout(() => {
        document.body.classList.remove('ready');
      }, gameTimerSeconds * 3 * 1000);
    } else {
      logPageView('game_end');
    }

    return () => {
      if (!!gameObj?.created && Date.now() - gameObj.created < 1000) {
        finishGame(false, true);
        alert('エラー：複数のゲームが同時に開始されました。やり直してください');
      } else {
        finishGame();
      }
    };
  }, [gameKey, gameObj, finishGame, isDuringGame]);

  return finishGame;
};

export default useGameStarted;
