/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import OnlineUsers from 'modules/home/onlineusers';
import GameSetter from 'modules/home/gamesetter';
import HomeLogo from 'modules/home/home.logo';
import bg from 'assets/svg/home-bg.svg';
import useUserMounted from 'hooks/use-usermounted';

const Home: FC<{ editMode: () => void }> = ({ editMode }) => {
  const users = useUserMounted();

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
        <GameSetter users={users} />
      </div>
    </div>
  );
};

export default Home;
