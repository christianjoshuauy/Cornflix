import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../axiosMovies";

export const trendingAdapter = createEntityAdapter();

export const fetchTrending = createAsyncThunk(
  "trending/fetchTrending",
  async () => {
    const response = await axios.get(
      `trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    return response.data.results;
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: trendingAdapter.getInitialState({ error: null }),
  extraReducers: (builder) => {
    builder.addCase(fetchTrending.fulfilled, (state, action) => {
      trendingAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchTrending.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.status_message;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { selectAll: selectAllTrending } = trendingAdapter.getSelectors(
  (state) => state.trending
);

export const selectTrendingError = (state) => state.trending.error;

export default trendingSlice.reducer;
