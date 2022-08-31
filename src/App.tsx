import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

import useUserName from 'hooks/use-username';
import { useToOnline, useToOffline } from 'hooks/use-toonline';
import useListenGameAndDeleteUser from 'hooks/use-listengameanddeleteuser';

import Game from 'components/pages/game';
import Home from 'components/pages/home';
import EditUser from 'components/pages/edituser';
import PrizmFooter from 'components/templates/prizmfooter';
import './App.css';

const App: FC = () => {
  const dispatch = useDispatch();

  const userKey = useSelector((state: RootState) => state.user.key);

  const gameKey = useSelector((state: RootState) => state.game.key);
  const gameObj = useSelector((state: RootState) => state.game.entity);
  const { unsetGame } = gameSlice.actions;

  const toOnline = useToOnline();
  const toOffline = useToOffline();

  const [editUserMode, setEditUserMode] = useState(false);

  useUserName();

  useEffect(() => {
    if (userKey === '' && gameKey === '' && !editUserMode) toOnline();
  }, [userKey, gameKey, editUserMode, toOnline]);

  useListenGameAndDeleteUser();

  useEffect(() => {
    if (userKey !== '' && editUserMode) toOffline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUserMode, userKey]);

  return (
    <>
      {!editUserMode &&
        (gameKey !== '' && gameObj ? (
          <Game setHome={() => dispatch(unsetGame())} />
        ) : (
          <Home editMode={() => setEditUserMode(true)} />
        ))}
      {editUserMode && <EditUser toHome={() => setEditUserMode(false)} />}
      <PrizmFooter />
    </>
  );
};

export default App;
