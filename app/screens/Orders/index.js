import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import OrdersScreen from './_main';
import CheckOutScreen from './check_out';
import MapScreen from './Map';
import AddressesScreen from './AddressesScreen';
import AddressFormScreen from './AddressFormScreen';
import OrderDetailsScreen from './orderDetailScreen';
//
const Stack = createNativeStackNavigator();
//
const OrdersStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />
            <Stack.Screen name="AddressesScreen" component={AddressesScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
            <Stack.Screen name="AddressFormScreen" component={AddressFormScreen} />
        </Stack.Navigator>
    )
}

export default OrdersStack;

