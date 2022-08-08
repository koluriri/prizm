/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState, useCallback } from 'react';
import OnlineUsers from 'components/organisms/onlineusers';
import { Mode, modesDisplay, Users } from 'data/types';
import { listenUsers, newOnlineUser } from 'hooks/database';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice, initialUserName } from 'ducks/user';

const Home: FC<{
  setGame: (mode: Mode, users: string[]) => void;
}> = ({ setGame }) => {
  const userName = useSelector((state: RootState) => state.user.name);
  const userKey = useSelector((state: RootState) => state.user.key);
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
  }, [userName, dispatch, setUserName]);

  const [users, setUsers] = useState<Users>();
  useEffect(() => {
    if (userKey === '' && userName === initialUserName) {
      // TODO: ここでゲーム中かどうかの判定もしないと、ゲーム中もオンラインになってしまう
      dispatch(setUserKey(newOnlineUser({ userName: getUserName() })));
      console.log('dispatch setUserKey & newOnlineUser');
    }

    listenUsers((data) => {
      setUsers(data);
    });
  }, [dispatch, userKey, userName, setUserKey, getUserName]);

  const [mode, setMode] = useState<Mode>('hard');

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
