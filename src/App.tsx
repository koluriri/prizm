/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

import { GameObj } from 'data/types';
import { listenGame, deleteUser } from 'hooks/database';

import Game from 'components/pages/game';
import Home from 'components/pages/home';
import './App.css';

const App: FC = () => {
  const userKey = useSelector((state: RootState) => state.user.key);
  const dispatch = useDispatch();
  const { unsetUserKey } = userSlice.actions;
  const { setGameKey, setGameEntity, unsetGame } = gameSlice.actions;

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);

  useEffect(() => {
    // listenGameはユーザー追加処理の後に移動しても良い気もするけど・・。
    if (userKey !== '') {
      // eslint-disable-next-line consistent-return
      listenGame(userKey, (data) => {
        if (!data.key) return false;

        deleteUser(userKey);
        dispatch(unsetUserKey());

        dispatch(setGameKey(data.key));
        dispatch(setGameEntity(data.val() as GameObj));
        console.log(`new game: ${data.key}`);
      });
    }

    const callback = () => deleteUser(userKey);
    window.addEventListener('beforeunload', callback);

    return () => window.removeEventListener('beforeunload', callback);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  return (
    <div
      css={css({
        width: '560px',
        maxWidth: '100%',
        minHeight: '100vh',
        padding: '10px',
        margin: '0 auto',
      })}
    >
      {gameKey !== '' && gameObj ? (
        <Game
          setHome={() => dispatch(unsetGame())}
          gameKey={gameKey}
          gameObj={gameObj}
        />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
