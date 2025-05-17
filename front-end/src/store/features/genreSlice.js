import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getGenres = createAsyncThunk(
    'genres/fetchGenres',
    async () => {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE'
            }
        };

        const response = await fetch(url, options);
        const jsonResponse = await response.json();

        return jsonResponse.genres;
    }
);

export const genreSlice = createSlice({
    name: 'genres',
    initialState: {
        genres: [],
        genresPending: false,
        genresError: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.genresPending = true;
                state.genresError = false;
            })

            .addCase(getGenres.fulfilled, (state, action) => {
                state.genresPending = false;
                state.genresError = false;
                state.genres = action.payload;
            })

            .addCase(getGenres.rejected, (state) => {
                state.genresPending = false;
                state.genresError = true;
                console.log('Something is wrong with genreSlice');
            })
    }
});

export const selectGenres = (state) => state.genres.genres;

export default genreSlice.reducer;