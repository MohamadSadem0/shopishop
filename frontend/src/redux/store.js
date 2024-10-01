import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serviceSectionsReducer from './serviceSectionsSlice';
import notificationReducer from './reducers/notificationReducer';  // Import notification reducer
import { combineReducers } from 'redux';

// Combine all your reducers
const rootReducer = combineReducers({
    auth: authReducer,
    serviceSections: serviceSectionsReducer,
    notifications: notificationReducer,  // Include the notification reducer
});

// Configure the store with the rootReducer
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in non-production environments
});

export default store;
