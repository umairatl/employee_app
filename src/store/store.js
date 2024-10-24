// remarks: not really using redux in my project, i add in for my learning purpose. mostly just use keychain to store tokens
import {configureStore, createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {setTokens} = tokensSlice.actions;

export const store = configureStore({
  reducer: {
    tokens: tokensSlice.reducer,
  },
});
