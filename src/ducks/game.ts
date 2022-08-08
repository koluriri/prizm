import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameObj } from 'data/types';

export type GameState = {
  key: string;
  entity: GameObj | null;
  isDuringGame: boolean;
};
const initialState: GameState = {
  key: '',
  entity: null,
  isDuringGame: false,
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
      isDuringGame: true,
      key: action.payload,
    }),
    startGame: (state) => ({ ...state, isDuringGame: true }),
    stopGame: (state) => ({ ...state, isDuringGame: false }),
    unsetGame: (state) => ({ ...state, key: '', entity: null }),
  },
});
