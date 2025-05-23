import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPopular = createAsyncThunk(
    'popular/fetchPopular',
    async () => {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE`
            }
        };
        const response = await fetch(url, options);
        const jsonResponse = await response.json();

        return jsonResponse.results;
    }
);

export const popularSlice = createSlice({
    name: 'popular',
    initialState: {
        movies: [],
        popularLoading: false,
        popularError: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPopular.pending, (state) => {
                state.popularLoading = true;
                state.popularError = false;
            })

            .addCase(getPopular.fulfilled, (state, action) => {
                state.popularLoading = false;
                state.popularError = false;
                state.movies = action.payload;
            })

            .addCase(getPopular.rejected, (state) => {
                state.popularLoading = false;
                state.popularError = true;
                console.log('Something is wrong with getPopular');
            })
    }
});

export const selectPopular = (state) => state.popular.movies;
export const selectPopularLoading = (state) => state.popular.popularLoading;
export const selectPopularError = (state) => state.popular.popularError;

export default popularSlice.reducer;