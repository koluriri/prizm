import shuffle from 'lodash/shuffle';
import { prefecture } from 'assets/data/prefecture';
import { logStartGame, writeNewGame } from 'utils/database';
import {
  Mode,
  PrefectureStr,
  Questions,
  modesCaption,
  modesConvert,
} from 'utils/types';

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

const randomMode = (): Mode => {
  const filteredModes = Object.keys(modesCaption).filter(
    (mode) => mode !== 'random',
  );
  const randomIndex = Math.floor(Math.random() * filteredModes.length);

  return filteredModes[randomIndex] as Mode;
};

type ImportData = typeof import('assets/data/cities');

const usePushGame =
  () => (mode: Mode, startBy: string, gameUsers: string[]) => {
    const randomPref: PrefectureStr =
      prefecture[Math.floor(Math.random() * prefecture.length)];

    const write = (questions: Questions) =>
      writeNewGame({
        answer: randomPref,
        questions,
        mode: mode === 'random' ? randomMode() : mode,
        startBy,
        messages: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        users: gameUsers,
        created: Date.now(),
      });

    const countDown: ('3' | '2' | '1')[] = ['3', '2', '1'];
    const mixedCityModes: Mode[] = ['easy', 'normal', 'veryveryhell'];

    let importPath: 'stations' | 'mountains' | 'cities';
    switch (mode) {
      case 'station':
        importPath = 'stations';
        break;

      case 'mountain':
        importPath = 'mountains';
        break;

      default:
        importPath = 'cities';
        break;
    }
    import(`assets/data/${importPath}`)
      .then(async (data: ImportData) => {
        if (mode === 'mixed') {
          const stations = (
            (await import(`assets/data/stations`)) as ImportData
          ).default()[randomPref];
          const mountains = (
            (await import(`assets/data/mountains`)) as ImportData
          ).default()[randomPref];
          const cities = data
            .default()
            [randomPref].map((city) =>
              modesConvert[
                mixedCityModes[
                  Math.floor(Math.random() * mixedCityModes.length)
                ]
              ](city),
            );
          write([
            ...countDown,
            ...shuffle([...cities, ...stations, ...mountains]).slice(0, 30),
          ]);
        } else {
          write([
            ...countDown,
            ...shuffle(data.default()[randomPref]).slice(0, 30),
          ]);
        }
        logStartGame(randomPref, mode, gameUsers.length, startBy);
      })
      .catch((err) => {
        alert('データを読み込めませんでした');
        console.error(err);
      });
  };

export default usePushGame;
