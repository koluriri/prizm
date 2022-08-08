import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'ducks/user';
import { gameSlice } from 'ducks/game';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  game: gameSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
