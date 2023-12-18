import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import MainProductsScreen from './_main';
import ProductsScreen from './ProductsScreen';
import ProductDetailsScreen from './DetailsScreen';
import FilteringScreen from './FilteringScreen';
import BrandsScreen from './BrandsScreen';
import ModelsScreen from './Models';
import ShopsScreen from './Shop';
import ShopProductsScreen from './ShopProducts';
//
const Stack = createNativeStackNavigator();
//
const ProductStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainProductsScreen" >
            <Stack.Screen name="MainProductsScreen" component={MainProductsScreen} />
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="DetailsScreen" component={ProductDetailsScreen} />
            <Stack.Screen name="FilteringScreen" component={FilteringScreen} />
            <Stack.Screen name="BrandsScreen" component={BrandsScreen} />
            <Stack.Screen name="ModelsScreen" component={ModelsScreen} />
            <Stack.Screen name="ShopsScreen" component={ShopsScreen} />
            <Stack.Screen name="ShopProductsScreen" component={ShopProductsScreen} />
        </Stack.Navigator>
    )
}

export default ProductStack;

