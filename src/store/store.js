import {configureStore} from '@reduxjs/toolkit';
import tokensReducer from './authSlice';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    employee: employeeReducer,
  },
});
