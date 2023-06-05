import { useCallback } from 'react';
import { deleteGame } from 'utils/database';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';
import { FinishGameFunction } from 'utils/types';

const useFinishGame = (): FinishGameFunction => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const dispatch = useDispatch();
  const { stopGame, unsetGame } = gameSlice.actions;

  return useCallback(
    (isDeleted = false, isUnset = false) => {
      if (!isDeleted) deleteGame(gameKey);

      dispatch(stopGame());

      if (isUnset) dispatch(unsetGame());
      document.body.classList.remove('ready');

      document.body.style.backgroundColor = 'var(--bg-color)';
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute('content', '#f2efe2');
      document
        .querySelector("meta[name='theme-color'][media*='dark']")
        ?.setAttribute('content', '#0b141c');
    },
    [gameKey, dispatch, stopGame, unsetGame],
  );
};

export default useFinishGame;
