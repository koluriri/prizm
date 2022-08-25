/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef, useState } from 'react';

import OnlineUsers from 'components/organisms/onlineusers';
import GameSetter from 'components/organisms/gamesetter';
import { Users } from 'data/types';
import { listenUsers, updatePingStamp } from 'utils/database';

import useUserName from 'hooks/use-username';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

const Home: FC = () => {
  const userName = useUserName();
  const userKey = useSelector((state: RootState) => state.user.key);

  const [users, setUsers] = useState<Users>();

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  useEffect(() => {
    timerId.current = setInterval(() => updatePingStamp(userKey), 3000);

    listenUsers((data) => {
      setUsers(data);
    });

    return clearTimer;
  }, [userKey]);

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
