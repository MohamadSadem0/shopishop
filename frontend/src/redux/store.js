import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationReducer from './reducers/notificationReducer';
import categoryReducer from './slices/categorySlice'; // Import categoryReducer
import serviceSectionsReducer from './slices/serviceSectionsSlice'; // Ensure correct import

const store = configureStore({
  reducer: {
    auth: authReducer,
    sections: serviceSectionsReducer,
    notifications: notificationReducer,
    category: categoryReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
