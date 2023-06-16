import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addFavorite, removeFavorite } from "../../firebase/firebase";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        return state.filter((movie) => movie.id !== action.payload.id);
      });
  },
});

export const addToFavorites = createAsyncThunk(
  "favorites/add",
  async (movie, { getState }) => {
    const { user } = getState().auth;
    await addFavorite(user.uid, movie);

    return movie;
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/remove",
  async (movie, { getState }) => {
    const { user } = getState().auth;
    await removeFavorite(user.uid, movie);

    return movie;
  }
);

export const selectFavorites = (state) => state.auth.user.favorites;

export default favoritesSlice.reducer;
