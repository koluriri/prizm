import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GameObj,
  initialRemain,
  UserSummaryObjOnStore,
  MessageObject,
  Messages,
} from 'utils/types';

export type GameState = {
  key: string;
  entity: GameObj | null;
  isDuringGame: boolean;
  currentQuesIndex: number;
  messages: Messages;
  allRemains: number;
  summary: UserSummaryObjOnStore;
};
const initialState: GameState = {
  key: '',
  entity: null,
  isDuringGame: false,
  currentQuesIndex: 1,
  messages: [],
  allRemains: 1000,
  summary: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameEntity: (state, action: PayloadAction<GameObj>) => {
      if (state.entity !== null) {
        return { ...state, key: '', entity: null };
      }

      return {
        ...state,
        entity: action.payload,
        allRemains: action.payload.users.length * initialRemain,
      };
    },
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
    pullMessage: (state, action: PayloadAction<MessageObject>) => {
      if (state.messages.find((msg) => msg.key === action.payload.key))
        return state;

      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    updateSummary: (state, action: PayloadAction<UserSummaryObjOnStore>) => ({
      ...state,
      summary: { ...state.summary, ...action.payload },
    }),
  },
});
