import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './features/popularSlice';

export const store = configureStore({
    reducer: {
        popular: popularReducer,
    }
})