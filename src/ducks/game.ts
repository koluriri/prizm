import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameObj } from 'data/types';

export type GameState = {
  key: string;
  entity: GameObj | null;
};
const initialState: GameState = {
  key: '',
  entity: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameEntity: (state, action: PayloadAction<GameObj>) => ({
      ...state,
      entity: action.payload,
    }),
    setGameKey: (state, action: PayloadAction<string>) => ({
      ...state,
      key: action.payload,
    }),
    unsetGame: (state) => ({ ...state, key: '', entity: null }),
  },
});
