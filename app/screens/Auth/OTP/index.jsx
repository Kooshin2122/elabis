//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import OTPscreen from './_main';
import CreatePassword from './CreatePassword';
//
const Stack = createNativeStackNavigator();
//
const OTPstack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OTP" component={OTPscreen} />
            <Stack.Screen name="CreatePassword" component={CreatePassword} />
        </Stack.Navigator>
    )
}
export default OTPstack;
//