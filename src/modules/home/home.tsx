/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useMemo, useState } from 'react';

import useUserMounted from 'modules/home/use-usermounted';

import OnlineUsers from 'modules/home/onlineusers';
import GameSetter from 'modules/home/gamesetter';
import HomeLogo from 'modules/home/home.logo';
import bg from 'assets/svg/home-bg.svg';
import { Mode } from 'utils/types';
import useAudio from 'hooks/use-audio';

const Home: FC<{ editMode: () => void; lastMode: Mode }> = ({
  editMode,
  lastMode,
}) => {
  const users = useUserMounted();

  const [prevUsersLength, setPrevUsersLength] = useState(1);
  const currentUsersLength = useMemo(
    () => Object.keys(users ?? {}).length,
    [users],
  );

  const playSE = useAudio();

  useEffect(() => {
    if (currentUsersLength !== prevUsersLength && currentUsersLength !== 0) {
      console.log(`current: ${currentUsersLength}`);
      console.log(`prev: ${prevUsersLength}`);
      if (currentUsersLength > prevUsersLength) {
        playSE('online');
      } else {
        playSE('offline');
      }
      setPrevUsersLength(currentUsersLength);
    }
  }, [currentUsersLength, prevUsersLength, playSE]);

  const homeContainer = css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'bg'
      'logo'
      'users'
      'setter';
    min-height: 100vh;
    width: 100vw;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 280px 3fr;
      grid-template-areas:
        'bg logo users'
        'bg setter users';
    }
  `;
  const homeLeftBg = css`
    display: none;
    grid-area: bg;
    background-image: url(${bg});
    background-repeat: repeat-x;
    background-size: cover;
    background-position: right center;

    @media (min-width: 768px) {
      display: block;
    }
  `;
  const homeOnlineUsersContainer = css`
    grid-area: users;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
      background-image: url(${bg});
      background-repeat: repeat-x;
      background-position: left center;
      background-size: cover;
      justify-content: start;
      padding: 0 30px 0 10vw;
    }
  `;
  const homeGameSetterContainer = css`
    grid-area: setter;
    padding-top: 15px;

    @media (min-width: 768px) {
      padding-top: 20px;
    }
  `;

  return (
    <div css={homeContainer}>
      <div css={homeLeftBg} />
      <HomeLogo />
      <div css={homeOnlineUsersContainer}>
        <OnlineUsers users={users} editMode={() => editMode()} />
      </div>
      <div css={homeGameSetterContainer}>
        <GameSetter users={users} lastMode={lastMode} />
      </div>
    </div>
  );
};

export default Home;
