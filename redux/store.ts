import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/productsSlice';
import loginsReducer from "./features/loginsSlice";
import cartReducer from "./features/cartSlice"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        login: loginsReducer,
        cart: cartReducer
    }
})
