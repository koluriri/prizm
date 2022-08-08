/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import OnlineUsers from 'components/organisms/onlineusers';
import GameSetter from 'components/organisms/gamesetter';
import { Users } from 'data/types';
import { listenUsers, newOnlineUser } from 'utils/database';

import useUserName from 'hooks/use-username';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice } from 'ducks/user';

const Home: FC = () => {
  const userName = useUserName();
  const userKey = useSelector((state: RootState) => state.user.key);
  const gameKey = useSelector((state: RootState) => state.game.key);
  const dispatch = useDispatch();
  const { setUserKey } = userSlice.actions;

  const [users, setUsers] = useState<Users>();
  useEffect(() => {
    if (userKey === '' && gameKey === '') {
      dispatch(setUserKey(newOnlineUser({ userName })));
      console.log('dispatch setUserKey & newOnlineUser');
    }

    listenUsers((data) => {
      setUsers(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey, gameKey]);

  return (
    <>
      <h1>Prizm</h1>

      <p css={css({ background: '#efefef' })}>参加者を待機中</p>

      <OnlineUsers users={users} />

      <GameSetter users={users} />

      <p>
        {userName}としてプレイ中{' '}
        <button type="button" onClick={() => alert('まだ')}>
          名前を変更
        </button>
      </p>
    </>
  );
};

export default Home;
