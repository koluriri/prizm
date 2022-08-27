/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import shuffle from 'lodash/shuffle';

import {
  localUserNameKey,
  Mode,
  modesCaption,
  modesDisplay,
  PrefectureStr,
  Questions,
  Users,
} from 'data/types';
import { prefecture } from 'data/prefecture';
import { writeNewGame } from 'utils/database';
import { initialUserName } from 'ducks/user';

const colors = [
  '#51B1C9',
  '#53822B',
  '#6DCE97',
  '#76B2B4',
  '#8FB505',
  '#9F68E8',
  '#C9C21E',
  '#D6A671',
  '#E8A21C',
  '#ED9489',
  '#F1B8B5',
  '#FFB554',
];

const GameSetter: FC<{
  users: Users | undefined;
}> = ({ users }) => {
  const [mode, setMode] = useState<Mode>('hard');
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

  const [modeCaption, setModeCaption] = useState('');
  useEffect(() => {
    setModeCaption(modesCaption[mode]);
  }, [mode]);

  const setGame = (gameUsers: string[]) => {
    const created = new Date();
    const randomPref: PrefectureStr = shuffle(prefecture)[0];

    const write = (questions: Questions) =>
      writeNewGame({
        answer: randomPref,
        questions,
        mode,
        startBy: userName,
        messages: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        users: gameUsers,
        created: `${created.getFullYear()}-${
          created.getMonth() + 1
        }-${created.getDate()} ${created.getHours()}:${
          created.getMinutes() + 1
        }:${created.getSeconds()}`.replace(/\n|\r/g, ''),
      });

    const importPath = mode === 'station' ? 'stations' : 'cities';
    import(`data/${importPath}`)
      .then((data: typeof import('data/cities')) => {
        write(shuffle(data.default()[randomPref]).slice(0, 30));
      })
      .catch((err) => {
        alert('データを読み込めませんでした');
        console.log(err);
      });
  };

  return (
    <>
      {users && (
        <>
          <div
            css={css(`
              margin: 0 auto;
              width: 340px;
              max-width: 95vw;
              max-width: calc(100vw - 60px);
              position: relative;

              &:after,&:before {
                content: '';
                width: 10px;
                height: 60px;
                background-image: linear-gradient(90deg, transparent 0%, var(--bg-color) 100%);
                display: block;
                position: absolute;
                right: 0;
                pointer-events: none;
                top: 0;
              }

              &:before {
                background-image: linear-gradient(-90deg, transparent 0%, var(--bg-color) 100%);
                left: 0;
              }

              @media (min-width: 768px) {
                width: auto;

                &:before, &:after {
                  content: none;
                }
              }`)}
          >
            <div
              css={css(`
              display: flex;
              overflow-y: auto;
              padding-left: 10px;

              &::-webkit-scrollbar {
                display: none;
              }

              &:after {
                content: '';
                display: block;
                min-width: 80px;
              }

              @media (min-width: 768px) {
                padding-left: 0;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                overflow: visible;

                &:after {
                  content: none;
                }
              }`)}
            >
              {Object.keys(modesDisplay).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setMode(key as Mode)}
                  className="bordercomp"
                  data-active={key === mode}
                >
                  {modesDisplay[key as Mode]}
                </button>
              ))}
            </div>
          </div>

          <p
            css={css(`
      font-weight: 700;
      font-size: 16px;
      text-align: center;
      color: #7A5154;
      `)}
          >
            {modeCaption}
          </p>

          <button
            type="button"
            onClick={() => setGame(Object.keys(users))}
            className="button-hinomaru"
          >
            ゲーム開始
          </button>
        </>
      )}

      {!users && <span className="loading" />}
    </>
  );
};

export default GameSetter;
