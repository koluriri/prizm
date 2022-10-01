/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Users } from 'utils/types';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import DeviceIcon from 'components/atoms/deviceicon';

const UserList: FC<{
  users: Users | undefined;
  usersLength: number;
  pingThreshold: number;
}> = ({ users, usersLength, pingThreshold }) => {
  const me = useSelector((state: RootState) => state.user.key);

  const userList = css`
    margin: 0;
    padding: 10px 17px 7px;
    min-height: 50px;
    max-height: 200px;
    list-style-type: none;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) {
      padding: 25px 23px 21px;
      min-height: 110px;
      max-height: 270px;
    }

    @media (max-width: 400px) {
      padding: 10px 8px 7px;
    }
  `;
  const userListItem = (color: string) => css`
    margin: 4px 0;
    --user-color: ${/^[#A-Za-z0-9]+$/.test(color) ? color : 'var(--red)'};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
    line-height: 1;
    flex-wrap: wrap;
    animation: 0.2s ease 0s 1 normal clicked;

    @media (min-width: 768px) {
      margin: 7px 0;
    }
  `;
  const userScore = css`
    margin: 0 7px;
    font-size: 13px;
    font-weight: 600;
    opacity: 0.6;

    @media (max-width: 400px) {
      margin-right: 0;
    }
  `;
  const myDevice = css`
    font-size: 13px;
    font-weight: 600;
    color: var(--red);
    margin: 3px 0;

    @media (max-width: 400px) {
      width: 130px;
      padding-left: 23px;
      margin-top: 3px;
      margin-bottom: 4px;
      &:before {
        content: '(';
      }
      &:after {
        content: ')';
      }
    }
  `;

  return (
    <ul css={userList}>
      {users &&
        Object.keys(users).map(
          (key) =>
            Date.now() - users[key].pingStamp < pingThreshold && (
              <li key={key} css={userListItem(users[key].color)}>
                <DeviceIcon device={users[key].device} />
                <span>{users[key].userName}</span>
                <span css={userScore}>スコア{users[key].score || '0'}</span>
                {key === me && <span css={myDevice}>この端末</span>}
              </li>
            ),
        )}
      {usersLength === 0 && <span className="loading" />}
    </ul>
  );
};

export default UserList;
