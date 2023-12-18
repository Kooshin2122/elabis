// imports
import { createSlice } from '@reduxjs/toolkit'
// Initial States
const initialState = {
    activeTab: "Categories",
    selectCategory: "All",
    selectSubCategory: {
        id: 0,
        name: "All",
    },
    selectBrand: {
        id: 0,
        name: "All"
    },
    // selectBrandInfo: "All",
    selectModel: 'All',
    selectShop: 'All',
    selectYear: 'All',
}
// Main Slice
export const productScreenSlice = createSlice({
    initialState,
    name: 'productsSlice',
    reducers: {
        // main product screen top tabs 
        changeActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        // 
        changeSelectCategory: (state, action) => {
            state.selectCategory = action.payload
        },
        // 
        changeSelectSubCategory: (state, action) => {
            state.selectSubCategory = action.payload
        },
        // 
        changeSelectBrand: (state, action) => {
            state.selectBrand = action.payload
        },
        // 
        changeSelectModel: (state, action) => {
            state.selectModel = action.payload
        },
        //
        changeSelectYear: (state, action) => {
            state.selectYear = action.payload
        }

    },
})
// Action creators are generated for each case reducer function
export const { changeActiveTab, changeSelectCategory, changeSelectSubCategory, changeSelectBrand, changeSelectModel, changeSelectYear } = productScreenSlice.actions
//
export default productScreenSlice.reducer;
//