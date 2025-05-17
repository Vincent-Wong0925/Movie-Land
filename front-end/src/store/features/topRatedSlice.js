import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTopRated = createAsyncThunk(
    'topRated/fetchTopRated',
    async () => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE'
            }
        };

        const response = await fetch(url, options);
        const jsonResponse = await response.json();

        return jsonResponse.results;
    }
);

export const topRatedSlice = createSlice({
    name: 'topRated',
    initialState: {
        movies: [],
        topRatedLoading: false,
        topRatedError: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTopRated.pending, (state) => {
                state.topRatedLoading = true;
                state.topRatedError = false;
            })

            .addCase(getTopRated.fulfilled, (state, action) => {
                state.topRatedLoading = false;
                state.topRatedError = false;
                state.movies = action.payload;
            })

            .addCase(getTopRated.rejected, (state) => {
                state.topRatedError = true;
                state.topRatedLoading = false;
                console.log('Something is wrong with topRatedSlice');
            })
    }
});

export const selectTopRated = (state) => state.topRated.movies;

export default topRatedSlice.reducer;