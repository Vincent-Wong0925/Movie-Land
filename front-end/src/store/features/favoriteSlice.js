import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFilmList } from "../../api";

export const getFilmList = createAsyncThunk(
    'favorite/fetchFilmList',
    fetchFilmList
);

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        filmList: [],
        filmListLoading: false,
        filmListError: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getFilmList.pending, (state) => {
                state.filmListLoading = true;
                state.filmListError = false;
            })

            .addCase(getFilmList.fulfilled, (state, action) => {
                state.filmList = action.payload;
                state.filmListLoading = false;
                state.filmListError = false;
            })

            .addCase(getFilmList.rejected, (state) => {
                state.filmListLoading = false;
                state.filmListError = true;
                console.log('Something is wrong with favoriteSlice');
            })
    }
});

export const selectFavorite = (state) => state.favorite.filmList;

export default favoriteSlice.reducer;