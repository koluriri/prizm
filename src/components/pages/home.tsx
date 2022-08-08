/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import OnlineUsers from 'components/organisms/onlineusers';
import GameSetter from 'components/organisms/gamesetter';
import { Users } from 'data/types';
import { listenUsers } from 'utils/database';

import useUserName from 'hooks/use-username';

const Home: FC = () => {
  const userName = useUserName();

  const [users, setUsers] = useState<Users>();
  useEffect(() => {
    listenUsers((data) => {
      setUsers(data);
    });
  }, []);

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
