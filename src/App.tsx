import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'ducks/rootReducer';
import { gameSlice } from 'ducks/game';

import useUserName from 'hooks/use-username';
import { useToOnline, useToOffline } from 'hooks/use-toonline';
import useListenGameAndDeleteUser from 'hooks/use-listengameanddeleteuser';

import Game from 'modules/game/game';
import Home from 'modules/home/home';
import EditUser from 'modules/edituser/edituser';
import PrizmFooter from 'components/templates/prizmfooter';
import Privacy from 'components/pages/privacy';
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
  const [privacyMode, setPrivacyMode] = useState(false);

  useUserName();

  useEffect(() => {
    if (userKey === '' && gameKey === '' && !editUserMode && !privacyMode)
      toOnline();
  }, [userKey, gameKey, editUserMode, privacyMode, toOnline]);

  const lastMode = useListenGameAndDeleteUser();

  useEffect(() => {
    if (userKey !== '' && editUserMode) toOffline();
    if (userKey !== '' && privacyMode) toOffline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUserMode, privacyMode, userKey]);

  return (
    <>
      {!editUserMode &&
        !privacyMode &&
        (gameKey !== '' && gameObj ? (
          <Game setHome={() => dispatch(unsetGame())} />
        ) : (
          <Home editMode={() => setEditUserMode(true)} lastMode={lastMode} />
        ))}
      {editUserMode && !privacyMode && (
        <EditUser toHome={() => setEditUserMode(false)} />
      )}
      {privacyMode && <Privacy toHome={() => setPrivacyMode(false)} />}
      <PrizmFooter privacyMode={() => setPrivacyMode(true)} />
    </>
  );
};

export default App;
