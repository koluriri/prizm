/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState, useCallback } from 'react';
import shuffle from 'lodash/shuffle';

import OnlineUsers from 'components/organisms/onlineusers';
import {
  Mode,
  modesDisplay,
  Users,
  PrefectureStr,
  Questions,
} from 'data/types';
import { prefecture } from 'data/prefecture';
import { listenUsers, writeNewGame, newOnlineUser } from 'utils/database';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice, initialUserName } from 'ducks/user';

const Home: FC = () => {
  const userName = useSelector((state: RootState) => state.user.name);
  const userKey = useSelector((state: RootState) => state.user.key);
  const gameKey = useSelector((state: RootState) => state.game.key);
  const dispatch = useDispatch();
  const { setUserKey, setUserName } = userSlice.actions;

  const getUserName = useCallback((): string => {
    if (userName !== initialUserName) return userName;

    const localUserName = localStorage.getItem('prizm-username');
    if (localUserName && localUserName !== '') {
      dispatch(setUserName(localUserName));

      return localUserName;
    }

    const inputName = window.prompt(
      'プレイしたいユーザー名をおしえてください',
      '',
    );
    if (inputName) {
      localStorage.setItem('prizm-username', inputName);
      dispatch(setUserName(inputName));

      return inputName;
    }

    return initialUserName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const [users, setUsers] = useState<Users>();
  useEffect(() => {
    if (userKey === '' && gameKey === '') {
      dispatch(setUserKey(newOnlineUser({ userName: getUserName() })));
      console.log('dispatch setUserKey & newOnlineUser');
    }

    listenUsers((data) => {
      setUsers(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey, gameKey]);

  // TODO:別コンポーネントにする
  const [mode, setMode] = useState<Mode>('hard');
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
    <>
      <h1>Prizm</h1>

      <p css={css({ background: '#efefef' })}>参加者を待機中</p>

      <OnlineUsers users={users} me={userKey} />

      <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
        {Object.keys(modesDisplay).map((key) => (
          <option value={key}>{modesDisplay[key as Mode]}</option>
        ))}
      </select>

      <br />

      {users && (
        <button type="button" onClick={() => setGame(Object.keys(users))}>
          この参加者でゲームを開始
        </button>
      )}

      <br />

      <p>
        {getUserName()}としてプレイ中{' '}
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('prizm-username', '');
            getUserName();
          }}
        >
          名前を変更
        </button>
      </p>
    </>
  );
};

export default Home;
