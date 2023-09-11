import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../constant";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

    //mutation because it is post request

    userLogin: builder.mutation({
      query: (data) => ({
        url: '/api/userLogin',
        body: data,
        method: 'POST'
      })
    }),

    userSignUp: builder.mutation({
      query: (data) => ({
        url: '/api/userSignup',
        body: data.body,
        method: 'POST'
      })
    }),

    userUpdate: builder.mutation({
      query: (query) => ({
        url: '/api/userUpdate',
        body: {
          shippingAddress: query.body,
          email: query.email,
          fullname: query.fullname
        },
        method: 'PATCH',
        headers: {
          Authorization: query.token
        }
      }),
      invalidatesTags: ['User']
    }),

    getuserOrder: builder.query({
      query: (token) => ({
        url: '/api/getUserOrder',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),

    getuserProfile: builder.query({
      query: (token) => ({
        url: '/api/userProfile',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),

    getAllUsers: builder.query({
      query: (token) => ({
        url: '/api/allUsers',
        method: 'GET',
        headers: {
          Authorization: token
        }
      }),
      providesTags: ['User']
    }),



  })

})

export const { useUserLoginMutation, useUserSignUpMutation, useUserUpdateMutation, useGetuserOrderQuery, useGetuserProfileQuery, useGetAllUsersQuery } = authApi