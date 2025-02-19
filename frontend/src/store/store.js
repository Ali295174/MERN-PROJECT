import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authslice.js";
import categoriesReducer from "./features/categories/categoriesSlice.js"
import  productsReducer from "./features/Products/productsSlice.js"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    storeCategory:categoriesReducer,
    storeProducts:productsReducer
  },
}) 