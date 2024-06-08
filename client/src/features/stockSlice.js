import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import list from "../utils/stockData";

const baseUrl = "http://localhost:5000";

// Async thunk for fetching initial stock data
const getInitialStock = createAsyncThunk("stock/getInitialStock", async () => {
  try {
    const promises = list.map(async (item) => {
      try {
        const response = await axios.get(`${baseUrl}/api/stock/`, {
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
    const stockMap = new Map(results);
    return stockMap;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
});

// Create a Redux Toolkit slice
const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    isLoading: false,
    isError: false,
    stocks: new Map(),
  },
  reducers: {
    // Add other synchronous reducers if needed
    setInitialStock: (state, action) => {
      state.stocks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.stocks = action.payload;
      })
      .addCase(getInitialStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInitialStock.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Export actions and reducer
export const { setInitialStock } = stockSlice.actions;
export default stockSlice.reducer;
export { getInitialStock };
