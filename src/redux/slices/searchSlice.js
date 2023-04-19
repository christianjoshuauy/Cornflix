import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosMovies";
import requests from '../../constants'

const initialState = {
    results: [],
    input: '',
    status: 'idle',
    error: null
}

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async(value) => {
    const response = await axios.get(`${requests.fetchSearchQuery}${value}`)
    return response.data.results
})

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        getSearchValue: (state, action) => {
            state.input = action.payload
        },
        clearSearchValue: (state, _) => {
            state.input = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResults.pending, (state, _) => {
            state.status = 'loading'
        })
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.results = []
            action.payload.forEach(result => {
                state.results.push({ ...result })
            })
            state.status = 'success'
        })
        builder.addCase(fetchSearchResults.rejected, (state, action) => {
            state.status = 'error'
            if(action.payload){
                state.error = action.payload.status_message
            }
            else{
                state.error = action.error
            }
        })
    }
})

export const selectSearch = state => state.search

export const { getSearchValue, clearSearchValue } = searchSlice.actions

export default searchSlice.reducer