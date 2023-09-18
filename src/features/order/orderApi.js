import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../constant";



export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: '/api/addOrder',
        body: data.body,
        headers: {
          Authorization: data.token
        },
        method: 'POST'
      }),
      invalidatesTags: ['Order']
    }),

    getUserOrder: builder.query({
      query: (token) => ({
        url: '/api/userOrder',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['Order']
    }),

    getOrderDetail: builder.query({
      query: (query) => ({
        url: `/api/orderDetail/${query.id}`,
        method: 'GET',
        headers: {
          Authorization: query.token
        }
      }),
      providesTags: ['Order']
    }),
    deleteOrderById: builder.mutation({
      query: (query) => ({
        url: `/api/cancelOrder/${query.id}`,
        method: 'DELETE',
        headers: {
          Authorization: query.token
        }

      }),
      invalidatesTags: ['Order']
    })


  }),

})

export const { useAddOrderMutation, useGetUserOrderQuery, useGetOrderDetailQuery, useDeleteOrderByIdMutation } = orderApi;