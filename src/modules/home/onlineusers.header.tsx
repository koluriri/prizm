/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useAudio from 'hooks/use-audio';
import { FC, useEffect, useRef, useState } from 'react';

const OnlineUsersHeader: FC<{
  usersLength: number;
  editMode: () => void;
}> = ({ usersLength, editMode }) => {
  const playSE = useAudio();

  const [showReload, setShowReload] = useState(false);
  const timerId = useRef<NodeJS.Timeout>();
  const clearTimer = () => clearTimeout(timerId.current);

  useEffect(() => {
    timerId.current = setTimeout(() => {
      setShowReload(true);
    }, 2000);

    return () => {
      setShowReload(false);
      clearTimer();
    };
  }, []);

  return (
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
      {usersLength === 0 ? (
        <>
          <span>接続中…</span>
          {showReload && (
            <button
              type="button"
              className="button-link"
              onClick={() => {
                window.location.reload();
              }}
            >
              接続されない場合はこちら
            </button>
          )}
        </>
      ) : (
        <>
          <span
            css={css`
              display: inline-flex;
            `}
          >
            現在、
            <em>
              <span>{usersLength}</span>人
            </em>
            が接続中
          </span>
          <button
            type="button"
            className="button-link"
            onClick={() => {
              playSE('button');
              editMode();
            }}
          >
            名前を変更する
          </button>
        </>
      )}
    </div>
  );
};

export default OnlineUsersHeader;
