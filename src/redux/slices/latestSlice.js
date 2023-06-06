import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosMovies";

const initialState = {
  latest: [],
  status: "idle",
  error: null,
};

export const fetchLatest = createAsyncThunk("latest/fetchLatest", async () => {
  const response = await Promise.all([
    axios
      .get(
        `discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6`
      )
      .then((response) => ({
        title: "Latest Movies on Cornflix",
        videos: response.data.results,
      })),
    axios
      .get(
        `discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=first_air_date.desc&page=1&timezone=America%2FNew_York&vote_average.gte=6&include_null_first_air_dates=false`
      )
      .then((response) => ({
        title: "Latest TV Shows on Cornflix",
        videos: response.data.results,
      })),
    axios
      .get(
        `movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      )
      .then((response) => ({
        title: "Upcoming Movies",
        videos: response.data.results,
      })),
  ]);
  return response;
});

const latestSlice = createSlice({
  name: "latest",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLatest.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(fetchLatest.fulfilled, (state, action) => {
      action.payload.forEach((latestVideo) => {
        state.latest.push({ ...latestVideo });
      });
      state.status = "success";
    });
    builder.addCase(fetchLatest.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.status_message;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const selectLatest = (state) => state.latest;

export default latestSlice.reducer;
