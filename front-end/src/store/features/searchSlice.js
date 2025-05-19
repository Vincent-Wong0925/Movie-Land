import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovieById = createAsyncThunk(
    'search/fetchMovieById',
    async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE'
            }
        };

        const response = await fetch(url, options);
        const jsonResponse = await response.json();

        return jsonResponse;
    }
);

export const searchMovieByName = createAsyncThunk(
    'search/fetchMovieByName',
    async (movieName) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE'
            }
        };

        const response = await fetch(url, options);
        const jsonResponse = response.json();

        return jsonResponse;
    }
);

export const searchMovieByGenre = createAsyncThunk(
    'search/fetchMovieByGenre',
    async (genre_id) => {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre_id}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE'
            }
        };

        const response = await fetch(url, options);
        const jsonResponse = await response.json();

        return jsonResponse;
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        result: {
            genres: [],
            results: [],
        },
        searchLoading: false,
        searchError: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMovieById.pending, (state) => {
                state.searchLoading = true;
                state.searchError = false;
            })

            .addCase(getMovieById.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchError = false;
                state.result = action.payload;
            })

            .addCase(getMovieById.rejected, (state) => {
                state.searchLoading = false;
                state.searchError = true;
                console.log('Something is wrong with searchSlice');
            })

            .addCase(searchMovieByName.pending, (state) => {
                state.searchLoading = true;
                state.searchError = false;
            })

            .addCase(searchMovieByName.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchError = false;
                state.result = action.payload;
            })

            .addCase(searchMovieByName.rejected, (state) => {
                state.searchLoading = false;
                state.searchError = true;
                console.log('Something is wrong with searchSlice');
            })

            .addCase(searchMovieByGenre.pending, (state) => {
                state.searchLoading = true;
                state.searchError = false;
            })

            .addCase(searchMovieByGenre.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchError = false;
                state.result = action.payload;
            })

            .addCase(searchMovieByGenre.rejected, (state) => {
                state.searchLoading = false;
                state.searchError = true;
                console.log('Something is wrong with searchSlice');
            })
    }
});

export const selectSearch = state => state.search.result;
export const selectSearchLoading = state => state.search.searchLoading;

export default searchSlice.reducer;