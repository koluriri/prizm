import { FC, useState } from 'react';
import shuffle from 'lodash/shuffle';

import {
  localUserNameKey,
  Mode,
  modesDisplay,
  PrefectureStr,
  Questions,
  Users,
} from 'data/types';
import { prefecture } from 'data/prefecture';
import { writeNewGame } from 'utils/database';
import { initialUserName } from 'ducks/user';

const GameSetter: FC<{
  users: Users | undefined;
}> = ({ users }) => {
  const [mode, setMode] = useState<Mode>('hard');
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

  const setGame = (gameUsers: string[]) => {
    const created = new Date();
    const randomPref: PrefectureStr = shuffle(prefecture)[0];

    const write = (questions: Questions) =>
      writeNewGame({
        answer: randomPref,
        questions,
        mode,
        startBy: userName,
        messages: [],
        users: gameUsers,
        created: `${created.getFullYear()}-${
          created.getMonth() + 1
        }-${created.getDate()} ${created.getHours()}:${
          created.getMinutes() + 1
        }:${created.getSeconds()}`.replace(/\n|\r/g, ''),
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

  return (
    <div className="gameSetter">
      <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
        {Object.keys(modesDisplay).map((key) => (
          <option key={key} value={key}>
            {modesDisplay[key as Mode]}
          </option>
        ))}
      </select>

      <br />

      {users && (
        <button type="button" onClick={() => setGame(Object.keys(users))}>
          この参加者でゲームを開始
        </button>
      )}
    </div>
  );
};

export default GameSetter;
