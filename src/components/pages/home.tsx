/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef, useState } from 'react';

import OnlineUsers from 'components/organisms/onlineusers';
import GameSetter from 'components/organisms/gamesetter';
import { localUserNameKey, Users } from 'data/types';
import { listenUsers, updatePingStamp } from 'utils/database';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { initialUserName } from 'ducks/user';

const Home: FC<{ editMode: () => void }> = ({ editMode }) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;
  const userKey = useSelector((state: RootState) => state.user.key);

  const [users, setUsers] = useState<Users>();

  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearInterval(timerId.current);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (userKey) updatePingStamp(userKey);
    }, 3000);

    listenUsers((data) => {
      setUsers(data);
    });

    return clearTimer;
  }, [userKey]);

  return (
    <div
      css={css(`display: grid;
    grid-template-columns: 0.5fr 280px 2fr;
    grid-template-areas:
        "bg logo users"
        "bg setter users";
    min-height: 100vh;
    width: 100vw;`)}
    >
      <div css={css(`grid-area: bg;`)}>area 1</div>
      <div css={css(`grid-area: logo;`)}>
        <h1>Prizm</h1>
      </div>
      <div css={css(`grid-area: users;`)}>
        <p css={css({ background: '#efefef' })}>参加者を待機中</p>

        <OnlineUsers users={users} />
      </div>
      <div css={css(`grid-area: setter;`)}>
        <GameSetter users={users} />

        <p>
          {userName}としてプレイ中{' '}
          <button type="button" onClick={() => editMode()}>
            名前を変更
          </button>
        </p>
      </div>
    </div>
  );
};

export default Home;
