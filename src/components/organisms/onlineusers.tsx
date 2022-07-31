import { Users } from 'data/types';
import { FC } from 'react';

const OnlineUsers: FC<{
  users: Users | undefined;
  me: string;
}> = ({ users, me }) => (
  <>
    <p>オンラインのユーザー：</p>
    <ul>
      {users &&
        Object.keys(users).map((key) => (
          <li>
            {users[key].userName}
            {key === me && ' (あなた)'}
          </li>
        ))}
    </ul>
  </>
);

export default OnlineUsers;
