import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, clearError } = authSlice.actions;

export const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
