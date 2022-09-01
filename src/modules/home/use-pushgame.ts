import shuffle from 'lodash/shuffle';
import { prefecture } from 'assets/data/prefecture';
import { logStartGame, writeNewGame } from 'utils/database';
import { Mode, PrefectureStr, Questions } from 'utils/types';

const colors = [
  '#51B1C9',
  '#6DCE97',
  '#76B2B4',
  '#8FB505',
  '#9F68E8',
  '#C9C21E',
  '#D6A671',
  '#E8A21C',
  '#ED9489',
  '#F1B8B5',
  '#FFB554',
];

const usePushGame =
  () => (mode: Mode, startBy: string, gameUsers: string[]) => {
    const randomPref: PrefectureStr =
      prefecture[Math.floor(Math.random() * prefecture.length)];

    const write = (questions: Questions) =>
      writeNewGame({
        answer: randomPref,
        questions,
        mode,
        startBy,
        messages: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        users: gameUsers,
        created: Date.now(),
      });

    const importPath = mode === 'station' ? 'stations' : 'cities';
    import(`assets/data/${importPath}`)
      .then((data: typeof import('assets/data/cities')) => {
        write(shuffle(data.default()[randomPref]).slice(0, 30));
        logStartGame(randomPref, mode, gameUsers.length, startBy);
      })
      .catch((err) => {
        alert('データを読み込めませんでした');
        console.error(err);
      });
  };

export default usePushGame;
