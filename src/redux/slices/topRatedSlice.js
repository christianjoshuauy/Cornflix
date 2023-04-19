import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from '../../axiosMovies'

export const topRatedAdapter = createEntityAdapter()

export const fetchTopRated = createAsyncThunk('topRated/fetchTopRated', async() => {
    const response = await axios.get(`movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
    return response.data.results
})

const topRatedSlice = createSlice({
    name: 'topRated',
    initialState: topRatedAdapter.getInitialState({ error: null }),
    extraReducers: (builder) => {
        builder.addCase(fetchTopRated.fulfilled, (state, action) => {
            topRatedAdapter.upsertMany(state, action.payload)
        })
        builder.addCase(fetchTopRated.rejected, (state, action) => {
            if(action.payload) {
                state.error = action.payload.status_message
            }
            else{
                state.error = action.error
            }
        })
    }
})

export const { selectAll: selectAllTopRated } = topRatedAdapter.getSelectors(state => state.topRated)

export const selectTopRatedError = state => state.topRated.error

export default topRatedSlice.reducer