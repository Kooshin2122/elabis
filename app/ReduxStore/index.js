//
import { configureStore } from '@reduxjs/toolkit';
//
import globalReducer from './GlobalSlice';
import ordersReducer from './OrdersSlice';
import productsReducer from './ProductScreenSlice';
//
export const store = configureStore({
    reducer: {
        globalSlice: globalReducer,
        ordersSlice: ordersReducer,
        productsSlice: productsReducer,
    },
})