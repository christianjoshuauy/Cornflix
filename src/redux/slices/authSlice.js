import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { removeCookie, setCookie } from "../../utils";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserFromCookie(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      setCookie("user", action.payload.uid, 1);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(signIn.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      setCookie("user", action.payload.uid, 1);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(signout.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(signout.fulfilled, (state, _) => {
      state.isLoading = false;
      state.user = null;
      removeCookie("user");
    });
    builder.addCase(signout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  await signOut(auth);
});

export const selectUser = (state) => state.auth.user;

export const { setUserFromCookie, clearUser } = authSlice.actions;

export default authSlice.reducer;
