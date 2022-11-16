import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState: {
        loggedIn: false,
    },
    reducers: {
        logged: (state, action) => {
            state.loggedIn = true;
            console.log(state.loggedIn);
        }
    }
});

export const { logged } = loggedInSlice.actions;
export default loggedInSlice.reducer;
