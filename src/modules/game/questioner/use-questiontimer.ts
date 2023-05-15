import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';
import { getSummary, updateSummaryFromKey } from 'utils/summary';
import { pushMessage } from 'utils/database';
import { FinishGameFunction, gameTimerSeconds } from 'utils/types';
import useAudio from 'hooks/use-audio';

const useQuestionTimer = (finishGame: FinishGameFunction) => {
  const dispatch = useDispatch();
  const { proceedQuesIndex } = gameSlice.actions;
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const gameKey = useSelector((state: RootState) => state.game.key);
  const messages = useSelector((state: RootState) => state.game.messages);
  const isDuringGame = useSelector(
    (state: RootState) => state.game.isDuringGame,
  );
  const currentQuesIndex = useSelector(
    (state: RootState) => state.game.currentQuesIndex,
  );

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = useCallback(() => clearInterval(timerId.current), []);

  const playSE = useAudio();

  useEffect(() => {
    if (isDuringGame) {
      timerId.current = setInterval(() => {
        dispatch(proceedQuesIndex());
        playSE('question');
      }, gameTimerSeconds * 1000);
    }

    return clearTimer;
  }, [isDuringGame, dispatch, proceedQuesIndex, clearTimer, playSE]);

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
      gameObj.questions.length !== 0 &&
      messages.find((msg) => msg.type === 'end') === undefined
    ) {
      pushMessage(gameKey, {
        type: 'end',
        value: '誰も答えられませんでした',
      });
      finishGame();
      clearTimer();
    }
  }, [
    currentQuesIndex,
    gameObj,
    gameKey,
    messages,
    finishGame,
    clearTimer,
    playSE,
  ]);

  return clearTimer;
};

export default useQuestionTimer;
