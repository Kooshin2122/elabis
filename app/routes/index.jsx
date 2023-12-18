import React, { useEffect } from 'react';
import BotomTabs from './BottomTabs';
import AuthStack from '../screens/Auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
// global variables
const Stack = createNativeStackNavigator();
//
const Root = () => {
    /* 
        I am using this useEffect to hide bottom tab navigation 
        when i want to display none on IOS devices.
    */
    useEffect(() => {
        enableScreens(false);
    }, [])
    //
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BottomTabs" component={BotomTabs} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
//
export default Root;

