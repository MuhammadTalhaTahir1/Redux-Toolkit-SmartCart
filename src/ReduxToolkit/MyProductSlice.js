import { createSlice } from "@reduxjs/toolkit";

const MyProductSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    addMyProduct(state = initialState, action) {
      state.push(action.payload);
    },
    increaseQty(state = initialState, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty + 1;
      }
    },
    decreaseQty(state = initialState, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty - 1;
      }
    },
  },
});
export const { addMyProduct, increaseQty, decreaseQty } =
  MyProductSlice.actions;
export default MyProductSlice.reducer;
