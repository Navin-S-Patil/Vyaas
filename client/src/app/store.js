import { configureStore } from "@reduxjs/toolkit";
import { stockSlice } from "../features/stockSlice";

// const configureStore = require("@reduxjs/toolkit").configureStore;
// const stockReducer = require("../features/stockSlice");

const store = configureStore({
  reducer: {
    stock: stockSlice.reducer,
  },
});

// module.exports = store;
export default store;
