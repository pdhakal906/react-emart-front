import { createSlice } from "@reduxjs/toolkit";
import { cartClear, clearAll, getCart, getUser, setCart, setUser } from "./localStorage";

console.log("helllllll")




export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfo: getUser(),
    carts: getCart()
  },

  reducers: {

    addUserToLocal: (state, action) => {

      state.userInfo = action.payload;

      setUser(state.userInfo);
    },


    addToCart: (state, action) => {

      const isExist = state.carts.find((cart) => cart.product === action.payload.product); // comapre the existing cart's product's id with the id of product provided in payload 


      if (isExist) {
        state.carts = state.carts.map((cart) => cart.product === isExist.product ? action.payload : cart);
        setCart(state.carts);

      } else {
        state.carts.push(action.payload);
        setCart(state.carts);
      }


    },

    removeFromCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCart(state.carts);

    },


    clearAlls: (state, action) => {
      state.userInfo = null;
      state.carts = [];
      clearAll();

    },

    userUpdate: (state, action) => {
      state.userInfo.shippingAddress = action.payload.shippingAddress || state.userInfo.shippingAddress;
      state.userInfo.email = action.payload.email || state.userInfo.email;
      state.userInfo.fullname = action.payload.fullname || state.userInfo.fullname;


      setUser(state.userInfo)
    },

    clearCart: (state, action) => {
      state.carts = [];
      cartClear();
    },

  }
});



export const { addUserToLocal, clearAlls, addToCart, removeFromCart, userUpdate, clearCart } = userInfoSlice.actions;
export default userInfoSlice.reducer;
