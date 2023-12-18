// imports
import { createSlice } from '@reduxjs/toolkit'
// Initial States
const initialState = {
    isUserLogin: true,
    shouldRenderTabBar: true,
}
// Main Slice
export const globalSlice = createSlice({
    initialState,
    name: 'globalSlice',
    reducers: {
        // I use this to show or hide tabBar Buttons in some screens
        hideTabBar: (state, action) => {
            state.shouldRenderTabBar = action.payload;
        },
        changeUserLoginStatus: (state, action) => {
            state.isUserLogin = action.payload;
        }
    },
})
// Action creators are generated for each case reducer function
export const { hideTabBar, changeUserLoginStatus } = globalSlice.actions
//
export default globalSlice.reducer;