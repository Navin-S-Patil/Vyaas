import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import list from "../../../utils/stockData";
// const list = require("../../../utils/stockData");
// const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
// const createSlice = require("@reduxjs/toolkit").createSlice;
// const axios = require("axios");

const getInitialStock = createAsyncThunk("stock/getInitialStock", async () => {
  try {
    const promises = list.map(async (item) => {
      try {
        const response = await axios.get("http://localhost:5000/api/stock/", {
          headers: {
            "Content-Type": "application/json",
            key: "RAIT",
            symbol: item,
          },
        });
        return [item, response.data];
      } catch (error) {
        console.error(`Error fetching data for ${item}:`, error.message);
        return [item, null];
      }
    });

    const results = await Promise.all(promises);
    const myMap = new Map(results);
    return myMap;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
});

// Create a Redux Toolkit slice
const stockSlice = createSlice({
  name: "stocks",
  initialState: {},
  reducers: {
    // Add other synchronous reducers if needed
    setInitialStock: (state, action) => {
      // Update the state with the fetched data if needed
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled action for getInitialStock
    builder.addCase(getInitialStock.fulfilled, (state, action) => {
      // Update the state with the fetched data if needed
      state = action.payload;
    });
  },
});

export const { actions, reducer } = stockSlice;


// module.exports = {
//   reducer: stockSlice.reducer,
//   getInitialStock: getInitialStock,
// };
