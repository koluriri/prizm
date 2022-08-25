/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Users } from 'data/types';
import { FC, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

const OnlineUsers: FC<{
  users: Users | undefined;
  editMode: () => void;
}> = ({ users, editMode }) => {
  const me = useSelector((state: RootState) => state.user.key);
  const [usersLength, setUsersLength] = useState(0);
  useEffect(() => {
    if (users) {
      setUsersLength(
        Object.keys(users).filter(
          (key) => Date.now() - users[key].pingStamp < 3500,
        ).length,
      );
    } else {
      setUsersLength(0);
    }
  }, [users]);

  return (
    <div
      css={css(`
    border: 4px solid var(--primary-color);
    border-radius: 20px;
    padding: 15px 20px;
    backdrop-filter: blur(30px);
    min-width: 320px;
    transition: 0.2s;`)}
    >
      <div
        css={css(`
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;`)}
      >
        {usersLength === 0 && <span>接続中…</span>}
        {usersLength !== 0 && (
          <span>
            現在、
            <em>
              <span>{usersLength}</span>人
            </em>
            が接続中
          </span>
        )}
        {usersLength !== 0 && (
          <button
            type="button"
            className="button-link"
            onClick={() => editMode()}
          >
            名前を変更する
          </button>
        )}
      </div>
      <ul
        css={css(`
    margin: 0;
    padding: 25px 23px 21px;
    list-style-type: none;
    min-height: 110px;
    max-height: 270px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;`)}
      >
        {users &&
          Object.keys(users).map(
            (key) =>
              Date.now() - users[key].pingStamp < 3500 && (
                <li
                  key={key}
                  css={css(`
                  margin: 7px 0;
                  --user-color: ${users[key].color};
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  font-weight: 700;
                  line-height: 1;
                  flex-wrap: wrap;

                  &:before {
                    content: '';
                    width: 10px;
                    height: 10px;
                    display: block;
                    background: var(--user-color);
                    border-radius: 10px;
                    margin-right: 7px;
                  }
                  `)}
                >
                  <span>{users[key].userName}</span>
                  <span
                    css={css(`
                      margin: 0 7px;
                      font-size: 13px;
                      font-weight: 600;
                      opacity: 0.6;
                  `)}
                  >
                    スコア{users[key].score || '0'}
                  </span>
                  <span
                    css={css(`
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--red);
                  `)}
                  >
                    {key === me && 'この端末'}
                  </span>
                </li>
              ),
          )}
        {usersLength === 0 && <span className="loading" />}
      </ul>
    </div>
  );
};

export default OnlineUsers;
