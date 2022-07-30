import { Users } from 'data/types';
import { FC } from 'react';

const OnlineUsers: FC<{ users: Users | undefined }> = ({ users }) => (
  <ul>
    {users && Object.keys(users).map((key) => <li>{users[key].userName}</li>)}
  </ul>
);

export default OnlineUsers;
