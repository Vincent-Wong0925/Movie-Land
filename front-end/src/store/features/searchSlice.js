import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovieById = createAsyncThunk(
    'search/getMovieById',
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

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        result: {},
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

            .addCase(getMovieById, (state, action) => {
                state.searchLoading = false;
                state.searchError = false;
                state.result = action.payload;
            })

            .addCase(getMovieById, (state) => {
                state.searchLoading = false;
                state.searchError = true;
                console.log('Something is wrong with searchSlice');
            })
    }
});

export const selectSearch = state => state.search.result;

export default searchSlice.reducer;