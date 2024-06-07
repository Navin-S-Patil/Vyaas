import { apiSlice } from "./apiSlice";

const STOCK_URL = "/api";

export const stockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buy: builder.mutation({
      query: (data) => ({
        url: `${STOCK_URL}/buy`,
        method: "POST",
        body: data,
      }),
    }),
    sell: builder.mutation({
      query: (data) => ({
        url: `${STOCK_URL}/sell`,
        method: "POST",
        body: data,
      }),
    }),
    getUserBalance: builder.mutation({
      query: (data) => ({
        url: `${STOCK_URL}/stocks/balance`,
        method: "POST",
        body: data,
      }),
    }),
    getProfit: builder.mutation({
      query: (data) => ({
        url: `${STOCK_URL}/stocks/profit`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBuyMutation, useSellMutation, useGetUserBalanceMutation, useGetProfitMutation } =
  stockApi;
