import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import SettingScreen from './_main';
import EditProfile from './EditProfile';
import UserInfoForm from './UserInfoForm';
import HelpeCenterScreen from './helpCenter';
import PrivacyAndPolocyScreen from './privacyAndPolocy';
import ChangePassword from './ChangePassword';

//
const Stack = createNativeStackNavigator();
//
const SettingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="UserInfoForm" component={UserInfoForm} />
            <Stack.Screen name="HelpCenter" component={HelpeCenterScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="PrivacyAndPolocy" component={PrivacyAndPolocyScreen} />
        </Stack.Navigator>
    )
}

export default SettingStack

