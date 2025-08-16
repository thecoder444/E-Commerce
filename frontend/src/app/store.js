import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "../features/CartSlice/CartSlice"

export const store = configureStore({
  reducer: {
    Cart: CartReducer
  },
})