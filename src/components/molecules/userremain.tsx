import { FC } from 'react';

const UserRemain: FC<{
  remain: number;
}> = ({ remain }) => <div>♥×{remain}</div>;

export default UserRemain;
