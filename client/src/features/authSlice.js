import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  //   balance: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userInfo = action.payload;
      //   state.userInfo.balance = null;
      //   state.balance = action.payload.balance;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      //   state.balance = null;
      localStorage.removeItem("userInfo");
    },
    setBalance: (state, action) => {
      console.log(action.payload);
      state.userInfo.balance = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setCredential, logout, setBalance } = authSlice.actions;
