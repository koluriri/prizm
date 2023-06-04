/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { deleteGame, logGameCanceled, pushMessage } from 'utils/database';
import { localUserNameKey } from 'utils/types';
import { initialUserName } from 'ducks/user';

const GameCancelOnReady: FC = () => {
  const gameKey = useSelector((state: RootState) => state.game.key);
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

  const cancel = () => {
    pushMessage(gameKey, {
      type: 'end',
      value: `${userName}によって\nゲームが\n中止されました`,
    });
    deleteGame(gameKey);
    logGameCanceled();
  };

  return (
    <div
      className="gamecancelonready"
      css={css`
        margin-top: 25px;
      `}
    >
      <button
        type="button"
        className="bordercomp"
        css={css`
          color: var(--black);
          border-color: var(--black);
        `}
        onClick={() => cancel()}
      >
        中止する
      </button>
    </div>
  );
};

export default GameCancelOnReady;
