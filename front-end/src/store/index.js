import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './features/popularSlice';
import topRatedReducer from './features/topRatedSlice';
import genresReducer from './features/genreSlice';
import searchReducer from './features/searchSlice';
import userReducer from './features/userSlice';
import favoriteReducer from './features/favoriteSlice';

export const store = configureStore({
    reducer: {
        popular: popularReducer,
        topRated: topRatedReducer,
        genres: genresReducer,
        search: searchReducer,
        user: userReducer,
        favorite: favoriteReducer,
    }
})