import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = { name: string };
const initialState: UserState = { name: 'Unknown' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    writeName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
  },
});
