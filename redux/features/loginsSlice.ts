import { createSlice } from '@reduxjs/toolkit'

const loginsSlice = createSlice({
    name: 'login',
    initialState: {
        user: {}
    },
    reducers: {
        setUserLogin: (state: any, action: any) => {
            state.user = action.payload;
            console.log(state)
        }
    }
})
export const {setUserLogin} = loginsSlice.actions
export default loginsSlice.reducer
