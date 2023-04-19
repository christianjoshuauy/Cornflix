import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axiosMovies'
import { genreTopVideos } from '../../utils'

const initialState = {
    genres: [],
    status: 'idle',
    error: null
}

async function fetchMovieGenres(){
    try {
        const response = await axios.get(`genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
        return response.data.genres
    } catch(error){
        throw new Error(error)
    }
}

export const fetchMovies = createAsyncThunk('movie/fetchMovies', async(_, { rejectWithValue }) => {
    try{
        const genres = await fetchMovieGenres()
        return await genreTopVideos(genres, 'movie')
    } catch(error){
        if(!error.response){
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state, _) => {
            state.status = 'loading'
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            action.payload.forEach(genre => {
                state.genres.push({ ...genre })
            })
            state.status = 'success'
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
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

export const selectMovies = state => state.movie

export default movieSlice.reducer