import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameObj, MessageObject, Messages } from 'data/types';

export type GameState = {
  key: string;
  entity: GameObj | null;
  isDuringGame: boolean;
  currentQuesIndex: number;
  messages: Messages;
};
const initialState: GameState = {
  key: '',
  entity: null,
  isDuringGame: false,
  currentQuesIndex: 1,
  messages: [],
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
      currentQuesIndex: 1,
      messages: [],
    }),
    startGame: (state) => ({ ...state, isDuringGame: true }),
    stopGame: (state) => ({ ...state, isDuringGame: false }),
    unsetGame: (state) => ({ ...state, key: '', entity: null }),
    proceedQuesIndex: (state) => ({
      ...state,
      currentQuesIndex: state.currentQuesIndex + 1,
    }),
    pullMessage: (state, action: PayloadAction<MessageObject>) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
  },
});
