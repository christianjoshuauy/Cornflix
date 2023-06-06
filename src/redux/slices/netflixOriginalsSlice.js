import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../axiosMovies";

export const netflixAdapter = createEntityAdapter();

export const fetchNetflixOriginals = createAsyncThunk(
  "netflixOriginals/fetchNetflixOriginals",
  async () => {
    const response = await axios.get(
      `discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_networks=213&include_null_first_air_dates=false`
    );
    return response.data.results;
  }
);

const netflixOriginalsSlice = createSlice({
  name: "netflixOriginals",
  initialState: netflixAdapter.getInitialState({ error: null }),
  extraReducers: (builder) => {
    builder.addCase(fetchNetflixOriginals.fulfilled, (state, action) => {
      netflixAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchNetflixOriginals.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.status_message;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { selectAll: selectAllNetflixOriginals } =
  netflixAdapter.getSelectors((state) => state.netflixOriginals);
export const selectNetflixError = (state) => state.netflixOriginals.error;

export default netflixOriginalsSlice.reducer;
