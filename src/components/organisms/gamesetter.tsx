import { FC, useState } from 'react';

import { localUserNameKey, Mode, Users } from 'utils/types';
import { initialUserName } from 'ducks/user';
import useSetGame from 'hooks/use-setgame';
import ModeSelector from 'components/molecules/modeselector';

const GameSetter: FC<{
  users: Users | undefined;
}> = ({ users }) => {
  const userName = localStorage.getItem(localUserNameKey) || initialUserName;

  const [mode, setMode] = useState<Mode>('hard');

  const setGame = useSetGame();

  return (
    <>
      {users && (
        <>
          <ModeSelector mode={mode} setMode={(newMode) => setMode(newMode)} />

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
