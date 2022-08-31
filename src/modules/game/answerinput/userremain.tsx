/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';

import { FaHeart, FaTimes } from 'react-icons/fa';

const UserRemain: FC<{
  remain: number;
}> = ({ remain }) => (
  <div
    css={css`
      height: 45px;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 3px;
    `}
  >
    <FaHeart />
    <FaTimes size={10} css={{ margin: '0 1px;' }} />
    {remain}
  </div>
);

export default UserRemain;
