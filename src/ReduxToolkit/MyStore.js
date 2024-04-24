import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "../ReduxToolkit/MyProductSlice";
import MyCartReducer from "../ReduxToolkit/MyCartSlice";
export const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
  },
});
