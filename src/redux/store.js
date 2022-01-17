import { configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import billsReducer from './billsSlice';
import userReducer from './userSlice';
export const store = configureStore({
    reducer: {
        bills: billsReducer,
        user: userReducer,
        alert: alertSlice
    },
})