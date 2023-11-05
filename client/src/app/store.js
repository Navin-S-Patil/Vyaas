import { configureStore } from "@reduxjs/toolkit";
import stockReducer  from "../features/stockSlice";
import { getInitialStock } from "../features/stockSlice";
import authReducer from "../features/authSlice";
import { apiSlice } from "../features/apiSlice";

const store = configureStore({
  reducer: {
    stock: stockReducer,
    auth : authReducer,
    [apiSlice.reducerPath] : apiSlice.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    // devTools: process.env.NODE_ENV !== 'production',
    serializableCheck: false,
  }).concat(apiSlice.middleware),
});


//call the setinitialstocks action
store.dispatch(getInitialStock());

// module.exports = store;
export default store;
