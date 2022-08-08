import { Users } from 'data/types';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

const OnlineUsers: FC<{
  users: Users | undefined;
}> = ({ users }) => {
  const me = useSelector((state: RootState) => state.user.key);

  return (
    <>
      <p>オンラインのユーザー：</p>
      <ul>
        {users &&
          Object.keys(users).map((key) => (
            <li key={key}>
              {users[key].userName}
              {key === me && ' (あなた)'}
            </li>
          ))}
      </ul>
    </>
  );
};

export default OnlineUsers;
