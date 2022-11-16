import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    logg : false,
    userName : null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logged: (state, action) => {
        state.logg = true;
    },
    loggedOut: (state, action) => {
        state.logg = false;
    },
    // fetchUser: (state, action) => {
    //     state.userName = action.payload;
    // }

  },
});

export const { loginStart, loginSuccess, loginFailure, logged, loggedOut } = userSlice.actions;
export default userSlice.reducer;
