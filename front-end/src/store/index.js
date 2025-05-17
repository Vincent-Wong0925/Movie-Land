import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './features/popularSlice';
import topRatedReducer from './features/topRatedSlice';

export const store = configureStore({
    reducer: {
        popular: popularReducer,
        topRated: topRatedReducer
    }
})