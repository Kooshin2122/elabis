import React from 'react'
import { Platform } from 'react-native';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// screens
import { HomeStack, ProductStack, OrdersStack, WishListScreen, SettingStack, } from '../../screens';

//
const Tab = createBottomTabNavigator();
//
const BotomTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary_color,
                tabBarStyle: {
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 70 : 90,
                    // backgroundColor: 'blue'
                },
            }}
        >
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="ProductStack" component={ProductStack}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="box" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="OrdersStack" component={OrdersStack}
                options={{
                    // tabBarBadge: 1,
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen name="WishListScreen" component={WishListScreen}
                options={{
                    tabBarLabel: 'Wish List',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cards-heart-outline" color={color} size={size} />
                    ),
                }}
            /> */}
            <Tab.Screen name="SettingStack" component={SettingStack}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default BotomTabs;

