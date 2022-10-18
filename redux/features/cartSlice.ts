import { createSlice } from '@reduxjs/toolkit'

const cart = {
    items: [],
    totalMoney: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cart,
    reducers: {
        addToCart: ((state: any, action: any) => {
            state.items.push(action.payload);
            state.totalQuantity++;
            state.totalMoney += action.payload.price;
        }),

        removeProduct: (state: any, action: any) => {
            let index = action.payload
            state.totalQuantity--;
            state.totalMoney -= state.items[index].price;
            state.items.splice(index, 1);
        }
    }
})

export const {addToCart, removeProduct} = cartSlice.actions

export default cartSlice.reducer;
