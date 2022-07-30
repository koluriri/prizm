/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import OnlineUsers from 'components/organisms/onlineusers';
import { Mode, modesDisplay, Users } from 'data/types';
import { listenUsers, newOnlineUser } from 'hooks/database';

const Home: FC<{
  setGame: (mode: Mode, users: string[]) => void;
  userKey: string;
  setUserKey: (key: string) => void;
}> = ({ setGame, userKey, setUserKey }) => {
  const [mode, setMode] = useState<Mode>('hard');

  const getUserName = (): string => {
    const userName = localStorage.getItem('prizm-username');
    if (userName && userName !== '') return userName;

    const inputName = window.prompt(
      'プレイしたいユーザー名をおしえてください',
      '',
    );
    if (inputName) {
      localStorage.setItem('prizm-username', inputName);

      return inputName;
    }

    return '海ネズミ';
  };

  console.log(getUserName());

  const [users, setUsers] = useState<Users>();
  useEffect(() => {
    if (userKey === '') {
      const newUserKey = newOnlineUser({ userName: getUserName() });
      setUserKey(newUserKey);
    }
    listenUsers((data) => {
      setUsers(data);
    });

    // return () => toOfflineUser(userKey);
  }, [userKey, setUserKey]);

  return (
    <>
      <h1>Prizm</h1>

      <p css={css({ background: '#efefef' })}>参加者を待機中</p>

      <OnlineUsers users={users} />

      <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
        {Object.keys(modesDisplay).map((key) => (
          <option value={key}>{modesDisplay[key as Mode]}</option>
        ))}
      </select>

      <br />

      {users && (
        <button type="button" onClick={() => setGame(mode, Object.keys(users))}>
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
