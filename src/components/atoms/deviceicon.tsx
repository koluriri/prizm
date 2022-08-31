/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { UserDevice } from 'utils/types';
import { FC } from 'react';

import { FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';

const DeviceIcon: FC<{
  device: UserDevice;
}> = ({ device }) => (
  <span
    css={css`
      width: 16px;
      height: 16px;
      display: block;
      /*
      width: 10px;
      background: var(--user-color);
      border-radius: 10px;
      margin-right: 7px;
      */
      margin-right: 4px;
      color: var(--user-color);
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {device === 'desktop' && <FaDesktop />}
    {device === 'tablet' && <FaTabletAlt />}
    {device === 'mobile' && <FaMobileAlt />}
  </span>
);

export default DeviceIcon;
