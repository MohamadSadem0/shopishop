import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationReducer from './reducers/notificationReducer';
import categoryReducer from './slices/categorySlice'; // Import categoryReducer
import sectionReducer from './slices/sectionSlice'; // Ensure correct import
import storeReducer from './slices/storeSlice'; // Ensure correct import
import productReducer from './slices/productSlice'; // Ensure correct import

const store = configureStore({
  reducer: {
    auth: authReducer,
    sections: sectionReducer,
    notifications: notificationReducer,
    categories: categoryReducer,
    stores: storeReducer,
    products: productReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
