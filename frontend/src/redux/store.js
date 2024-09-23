// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from './authSlice';
import serviceSectionsReducer from './serviceSectionsSlice'; // Import the new slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceSections: serviceSectionsReducer, 
  },
  devTools: composeWithDevTools(),
});

export default store;
