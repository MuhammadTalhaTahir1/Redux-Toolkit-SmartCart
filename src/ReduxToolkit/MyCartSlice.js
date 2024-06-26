import { createSlice } from "@reduxjs/toolkit";

const MyCartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProductToMyCart(state = initialState, action) {
      //   state.push(action.payload);
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
        state.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          qty: action.payload.qty + 1,
        });
      } else {
        state[myindex].qty = state[myindex].qty + 1;
      }
    },
    removeMyCartItem(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty - 1;
      }
    },
    deleteMyCartItem(state = initialState, action) {
      return (state = state.filter((item) => {
        item.id !== action.payload;
      }));
    },
  },
});
export const { addProductToMyCart, removeMyCartItem, deleteMyCartItem } =
  MyCartSlice.actions;
export default MyCartSlice.reducer;
