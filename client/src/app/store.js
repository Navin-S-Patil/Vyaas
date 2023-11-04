import { configureStore } from "@reduxjs/toolkit";
import stockReducer  from "../features/stockSlice";
import { getInitialStock } from "../features/stockSlice";

// const configureStore = require("@reduxjs/toolkit").configureStore;
// const stockReducer = require("../features/stockSlice");

const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    devTools: process.env.NODE_ENV !== 'production',
    serializableCheck: false,
  }),
});


//call the setinitialstocks action
store.dispatch(getInitialStock());

// module.exports = store;
export default store;
