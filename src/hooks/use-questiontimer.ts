import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';
import { getSummary, updateSummaryFromKey } from 'utils/summary';
import { pushMessage } from 'utils/database';

const useQuestionTimer = (finishGame: () => void) => {
  const dispatch = useDispatch();
  const { proceedQuesIndex } = gameSlice.actions;
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const gameKey = useSelector((state: RootState) => state.game.key);
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = useCallback(() => clearInterval(timerId.current), []);

  useEffect(() => {
    if (isDuringGame) {
      const timerSeconds = 1.5;
      timerId.current = setInterval(
        () => dispatch(proceedQuesIndex()),
        timerSeconds * 1000,
      );
    }

    return clearTimer;
  }, [isDuringGame, dispatch, proceedQuesIndex, clearTimer]);

  useEffect(() => {
    if (currentQuesIndex === 2) {
      const summary = getSummary();
      if (summary && summary.lastPlay !== gameObj?.created) {
        updateSummaryFromKey('playCount', (count) => count + 1);
        updateSummaryFromKey('lastPlay', gameObj?.created ?? Date.now());
      }
    }

    if (
      gameObj &&
      currentQuesIndex === gameObj.questions.length &&
      gameObj.questions.length !== 0
    ) {
      pushMessage(gameKey, {
        type: 'end',
        value: '誰も答えられませんでした',
      });
      finishGame();
      clearTimer();
    }
  }, [currentQuesIndex, gameObj, gameKey, finishGame, clearTimer]);

  return clearTimer;
};

export default useQuestionTimer;
