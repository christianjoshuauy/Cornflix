import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axiosMovies'
import { genreTopVideos } from '../../utils'

const initialState = {
    genres: [],
    status: 'idle',
    error: null
}

async function fetchTvGenres(){
    const response = await axios.get(`genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
    return response.data.genres
}

export const fetchTvShow = createAsyncThunk('tvShow/fetchTvShow', async() => {
    const genres = await fetchTvGenres()
    return await genreTopVideos(genres, 'tv')
})

const tvShowSlice = createSlice({
    name: 'tvShow',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTvShow.pending, (state, _) => {
            state.status = 'loading'
        })
        builder.addCase(fetchTvShow.fulfilled, (state, action) => {
            action.payload.forEach(genre => {
                state.genres.push({ ...genre })
            })
            state.status = 'success'
        })
        builder.addCase(fetchTvShow.rejected, (state, action) => {
            state.status = 'error'
            if(action.payload) {
                state.error = action.payload.status_message
            }
            else{
                state.error = action.error
            }
        })
    }
})

export const selectTvShow = state => state.tvShow

export default tvShowSlice.reducer