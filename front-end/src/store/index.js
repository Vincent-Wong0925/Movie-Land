import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './features/popularSlice';
import topRatedReducer from './features/topRatedSlice';
import genresReducer from './features/genreSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
    reducer: {
        popular: popularReducer,
        topRated: topRatedReducer,
        genres: genresReducer,
        search: searchReducer
    }
})