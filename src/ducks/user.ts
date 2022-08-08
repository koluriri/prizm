import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialUserName = 'Unknown';

export type UserState = {
  name: string;
  key: string;
};
const initialState: UserState = {
  name: initialUserName,
  key: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    setUserKey: (state, action: PayloadAction<string>) => ({
      ...state,
      key: action.payload,
    }),
    unsetUserKey: (state) => ({ ...state, key: '' }),
  },
});
