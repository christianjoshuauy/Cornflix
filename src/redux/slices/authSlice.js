import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, createUser } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
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
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action);
    });
    builder.addCase(signIn.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action);
    });
    builder.addCase(signout.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(signout.fulfilled, (state, _) => {
      state.isLoading = false;
      state.user = null;
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

    const userRef = await createUser(user);
    const userSnapshot = await getDoc(userRef);

    const sessionUser = {
      id: userSnapshot.id,
      ...userSnapshot.data(),
    };

    return sessionUser;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ displayName, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userRef = await createUser(user, { displayName });
    const userSnapshot = await getDoc(userRef);

    const sessionUser = {
      id: userSnapshot.id,
      ...userSnapshot.data(),
    };

    return sessionUser;
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  await signOut(auth);
});

export const selectUser = (state) => state.auth.user;

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
