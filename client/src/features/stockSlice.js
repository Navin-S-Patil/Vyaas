import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import list from "../utils/stockData";

const baseUrl = "https://vyaas.onrender.com";

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
  initialState: {
    isLoading : false,
    isError: false,
    stocks : {}
  },
  reducers: {
    // Add other synchronous reducers if needed
    setInitialStock: (state, action) => {
      // Update the state with the fetched data if needed
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled action for getInitialStock
    builder.addCase(getInitialStock.fulfilled, (state, action) => {
      // Update the state with the fetched data if needed
      console.log(action.payload)

      state.isLoading = false;
      state.isError = false;

      state.stocks = action.payload;

      // return action.payload;
    });

    // Handle the pending action for getInitialStock
    builder.addCase(getInitialStock.pending, (state, action) => {
      // Update the state with the fetched data if needed
      state.isLoading = true;
      return;
    });

    builder.addCase(getInitialStock.rejected, (state, action) => {
      // Update the state with the fetched data if needed
      console.log('Error', action.payload);
      state.isError = true;
      return;
    });
  },
});

// Export actions
export default stockSlice.reducer;
export const { setInitialStock } = stockSlice.actions;
export { getInitialStock };
