import shuffle from 'lodash/shuffle';
import { prefecture } from 'data/prefecture';
import { writeNewGame } from 'utils/database';
import { Mode, PrefectureStr, Questions } from 'data/types';

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

const useSetGame = () => (mode: Mode, startBy: string, gameUsers: string[]) => {
  const randomPref: PrefectureStr = shuffle(prefecture)[0];

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
  import(`data/${importPath}`)
    .then((data: typeof import('data/cities')) => {
      write(shuffle(data.default()[randomPref]).slice(0, 30));
    })
    .catch((err) => {
      alert('データを読み込めませんでした');
      console.log(err);
    });
};

export default useSetGame;