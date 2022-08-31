import { useCallback } from 'react';
import { deleteGame } from 'utils/database';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';
import { FinishGameFunction } from 'utils/types';

const useFinishGame = (): FinishGameFunction => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const dispatch = useDispatch();
  const { stopGame } = gameSlice.actions;

  return useCallback(
    (isDeleted = false) => {
      if (!isDeleted) deleteGame(gameKey);

      dispatch(stopGame());

      document.body.style.backgroundColor = 'var(--bg-color)';
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute('content', '#f2efe2');
    },
    [gameKey, dispatch, stopGame],
  );
};

export default useFinishGame;
