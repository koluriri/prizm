/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useRef, useState } from 'react';

import OnlineUsers from 'components/organisms/onlineusers';
import GameSetter from 'components/organisms/gamesetter';
import { Users } from 'data/types';
import { listenUsers, updatePingStamp } from 'utils/database';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import bg from 'assets/home-bg-preview.svg';
import logo from 'assets/logo-vertical.svg';

const Home: FC<{ editMode: () => void }> = ({ editMode }) => {
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
      css={css(`
      display: grid;
      grid-template-columns: 1fr 280px 3fr;
      grid-template-areas:
          "bg logo users"
          "bg setter users";
      min-height: 100vh;
      width: 100vw;
      background-color: var(--bg-color);
    `)}
    >
      <div
        css={css(`grid-area: bg;
      background-image: url(${bg});
      background-repeat: repeat-x;
      background-size: cover;
      background-position: right center;`)}
      />
      <div
        css={css(`grid-area: logo;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;`)}
      >
        <h1 css={css(`width: 120px;margin: 0;`)}>
          <img src={logo} alt="prizm" />
        </h1>
        <h2
          css={css(`
    font-size: 17px;
    font-weight: 900;
    line-height: 1;
    margin: 8px 0 10px;
    text-align: center;
    line-height: 1.35;`)}
        >
          市町村から
          <br />
          都道府県を当てるだけ！
        </h2>
      </div>
      <div
        css={css(`
      grid-area: users;background-image: url(${bg});
      background-repeat: repeat-x;
      background-size: cover;
      background-position: left center;
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 30px 0 10vw;`)}
      >
        <OnlineUsers users={users} editMode={() => editMode()} />
      </div>
      <div css={css(`grid-area: setter;`)}>
        <GameSetter users={users} />
      </div>
    </div>
  );
};

export default Home;
