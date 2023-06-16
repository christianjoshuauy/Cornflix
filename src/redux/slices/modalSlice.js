import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  movie: null,
  isFavorite: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.movie = action.payload.movie;
      state.isFavorite = action.payload.isFavorite;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.movie = null;
      state.isFavorite = false;
    },
  },
});

export const selectIsOpen = (state) => state.modal.isOpen;
export const selectMovie = (state) => state.modal.movie;
export const selectIsFavorite = (state) => state.modal.isFavorite;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
