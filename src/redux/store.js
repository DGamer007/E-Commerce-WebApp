import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer
    }
});