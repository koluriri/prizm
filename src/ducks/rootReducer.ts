import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'ducks/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
