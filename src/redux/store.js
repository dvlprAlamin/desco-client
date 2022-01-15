import { configureStore } from '@reduxjs/toolkit';
import billsReducer from './billsSlice';
export const store = configureStore({
    reducer: {
        bills: billsReducer
    },
})