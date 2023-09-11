import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import userReducer from './userInfo'
import { productApi } from "./product/productApi";
import { orderApi } from "./order/orderApi";




export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware

    ]),
})