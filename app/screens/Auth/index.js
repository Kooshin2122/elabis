//
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import WelcomeScreen from './_main';
import LoginStack from './LOGIN';
import OTPstack from './OTP';
import SignUpScreen from './SignUp';
//
const Stack = createNativeStackNavigator();
//
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginStack" component={LoginStack} />
            <Stack.Screen name="OTPstack" component={OTPstack} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
    )
}
//
export default AuthStack;
//