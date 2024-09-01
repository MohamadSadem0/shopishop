// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './authSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,

  },
  devTools: composeWithDevTools(),
});

export default store;
