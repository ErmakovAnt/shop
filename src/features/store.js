import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice";
import productSlice from "./products/productSlice";
import singleProductSlice from "./product/singleProductSlice";
import userSlice from "./users/userSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productSlice,
    product: singleProductSlice,
    user: userSlice,
  },
  devTools: true,
});
