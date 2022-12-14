/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Users } from 'utils/types';
import { FC, useEffect, useState } from 'react';

import backgroundImage from 'assets/svg/sp-bg.svg';
import OnlineUsersHeader from 'modules/home/onlineusers.header';
import UserList from 'modules/home/onlineusers.userlist';

const OnlineUsers: FC<{
  users: Users | undefined;
  editMode: () => void;
}> = ({ users, editMode }) => {
  const pingThreshold = 7700;

  const [usersLength, setUsersLength] = useState(0);
  useEffect(() => {
    setUsersLength(
      users
        ? Object.keys(users).filter(
            (key) => Date.now() - users[key].pingStamp < pingThreshold,
          ).length
        : 0,
    );
  }, [users]);

  const onlineUsersContainer = css`
    border: 4px solid var(--primary-color);
    border-radius: 20px;
    padding: 15px 20px;
    backdrop-filter: blur(30px);
    width: 340px;
    max-width: 95%;
    max-width: calc(100vw - 60px);
    transition: 0.2s;
    background-image: url(${backgroundImage});
    background-size: 180%;
    background-position: -50px -50px;

    @media (min-width: 768px) {
      width: auto;
      min-width: 350px;
    }
  `;

  return (
    <div css={onlineUsersContainer}>
      <OnlineUsersHeader usersLength={usersLength} editMode={editMode} />
      <UserList
        users={users}
        usersLength={usersLength}
        pingThreshold={pingThreshold}
      />
    </div>
  );
};

export default OnlineUsers;
