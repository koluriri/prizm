/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Users } from 'data/types';
import { FC, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';

import spbg from 'assets/sp-bg.svg';
import { FaUserAlt } from 'react-icons/fa';

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
          (key) => Date.now() - users[key].pingStamp < 4700,
        ).length,
      );
    } else {
      setUsersLength(0);
    }
  }, [users]);

  return (
    <div
      css={css`
        border: 4px solid var(--primary-color);
        border-radius: 20px;
        padding: 15px 20px;
        backdrop-filter: blur(30px);
        width: 340px;
        max-width: 95%;
        max-width: calc(100vw - 60px);
        transition: 0.2s;
        background-image: url(${spbg});
        background-size: 180%;
        background-position: -50px -50px;

        @media (min-width: 768px) {
          width: auto;
          min-width: 350px;
        }
      `}
    >
      <div
        css={css`
          font-size: 13px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          padding-bottom: 7px;

          @media (min-width: 768px) {
            font-size: 15px;
          }
        `}
      >
        {usersLength === 0 && <span>接続中…</span>}
        {usersLength !== 0 && (
          <span
            css={css`
              display: inline-flex;
            `}
          >
            現在
            <em>
              <FaUserAlt
                size="0.9em"
                style={{ marginRight: 3, marginLeft: 3 }}
              />
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
        css={css`
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
        `}
      >
        {users &&
          Object.keys(users).map(
            (key) =>
              Date.now() - users[key].pingStamp < 4700 && (
                <li
                  key={key}
                  css={css`
                    margin: 4px 0;
                    --user-color: ${users[key].color};
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-weight: 700;
                    line-height: 1;
                    flex-wrap: wrap;

                    @media (min-width: 768px) {
                      margin: 7px 0;
                    }

                    &:before {
                      content: '';
                      width: 10px;
                      height: 10px;
                      display: block;
                      background: var(--user-color);
                      border-radius: 10px;
                      margin-right: 7px;
                    }
                  `}
                >
                  <span>{users[key].userName}</span>
                  <span
                    css={css`
                      margin: 0 7px;
                      font-size: 13px;
                      font-weight: 600;
                      opacity: 0.6;

                      @media (max-width: 400px) {
                        margin-right: 0;
                      }
                    `}
                  >
                    スコア{users[key].score || '0'}
                  </span>
                  {key === me && (
                    <span
                      css={css`
                        font-size: 13px;
                        font-weight: 600;
                        color: var(--red);

                        @media (max-width: 400px) {
                          width: 130px;
                          padding-left: 18px;
                          margin-top: 3px;
                          margin-bottom: 4px;
                          &:before {
                            content: '(';
                          }
                          &:after {
                            content: ')';
                          }
                        }
                      `}
                    >
                      この端末
                    </span>
                  )}
                </li>
              ),
          )}
        {usersLength === 0 && <span className="loading" />}
      </ul>
    </div>
  );
};

export default OnlineUsers;
