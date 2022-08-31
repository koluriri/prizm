import { localScoreKey, Mode, modesScore } from 'utils/types';

type UpdateScoreFunction = (
  mode: Mode,
  questionsLength: number,
  current: number,
) => number;

const useUserScore =
  (): UpdateScoreFunction =>
  (mode: Mode, questionsLength: number, current: number) => {
    const score = Math.round(
      modesScore[mode](100 - (100 / questionsLength) * (current - 1)),
    );

    // local storageに加算
    const localScore = localStorage.getItem(localScoreKey);
    const setValue = String(
      localScore ? parseInt(localScore, 10) + score : score,
    );
    localStorage.setItem(localScoreKey, setValue);

    return score;
  };

export default useUserScore;
