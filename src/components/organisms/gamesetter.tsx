/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import { localUserNameKey, Mode, modesCaption, Users } from 'data/types';
import { initialUserName } from 'ducks/user';
import useSetGame from 'hooks/use-setgame';
import ModeSelector from 'components/molecules/modeselector';

const GameSetter: FC<{
  users: Users | undefined;
}> = ({ users }) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

  const [mode, setMode] = useState<Mode>('hard');
  const [modeCaption, setModeCaption] = useState('');
  const modeCaptionStyle = css`
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #7a5154;
  `;
  useEffect(() => {
    setModeCaption(modesCaption[mode]);
  }, [mode]);

  const setGame = useSetGame();

  return (
    <>
      {users && (
        <>
          <ModeSelector mode={mode} setMode={(newMode) => setMode(newMode)} />
          <p css={modeCaptionStyle}>{modeCaption}</p>

          <button
            type="button"
            onClick={() => setGame(mode, userName, Object.keys(users))}
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
