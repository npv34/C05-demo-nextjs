import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: []
    },
    reducers: {
        setData: (state: any, action: any) => {
            state.data = action.payload;
        }
    }
})
export const {setData} = productsSlice.actions
export default productsSlice.reducer
