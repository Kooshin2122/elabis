import React, { useCallback, useEffect } from 'react'
import { fetchGetData } from '../../../API';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { useFocusEffect } from '@react-navigation/core';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BrandSection, CategoriesSection, MainProductHeader } from './components';
import { changeSelectBrand, changeSelectSubCategory } from '../../../ReduxStore/ProductScreenSlice';
//
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopsScreen from '../Shop';
import { Header } from '../../../components';
//
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
//
const MainProductsScreen = () => {
    const dispatch = useDispatch();
    const { activeTab } = useSelector((state) => state.productsSlice);
    // // dispach all filters to initial values
    // useFocusEffect(useCallback(() => {
    //     dispatch(changeSelectSubCategory("All"));
    //     dispatch(changeSelectBrand({
    //         name: "All", Modal: "All", year: "All"
    //     }));
    // }, []));
    //
    return (
        <SafeAreaView style={styles.container}>
            <Header label="Product Filtering" />
            <Tab.Navigator
                initialRouteName={activeTab}
                screenOptions={{
                    lazy: true,
                    tabBarStyle: {
                        elevation: 1,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: COLORS.primary_color
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: 'gray',
                    // tabBarStyle: { marginHorizontal: '3%' },
                    tabBarLabelStyle: { fontSize: 14, fontWeight: '500', },
                }}
            >
                <Tab.Screen name="Categories" component={CategoriesSection} />
                <Tab.Screen name="Brands" component={BrandSection} />
                <Tab.Screen name="Shops" component={ShopsScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}
//
export default MainProductsScreen;
const ProductTopTapsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainProductsScreen" >
            <Stack.Screen name="Categories" component={CategoriesSection} />
            <Stack.Screen name="Brands" component={BrandSection} />
            <Stack.Screen name="Shops" component={ShopsScreen} />
        </Stack.Navigator>
    )
}
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
})
