import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vyaas.onrender.com', credentials: 'include' }),
  tagTypes: ["User", "Stock"],
  endpoints: (builder) => ({

    //portfolio endpoints
    getPortfolio: builder.query({
      query: () => `/api/portfoliodata`,
      method: "GET",
      providesTags: ["Portfolio"],
    }),
  }),
});


export const { useGetPortfolioQuery } = apiSlice;