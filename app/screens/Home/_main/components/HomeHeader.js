//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import logo from '../../../../../assets/images/logo.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LAY_OUT, COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const HomeHeader = () => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoCon}>
                <Image
                    source={logo}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.iconsCon}>
                {/* <Pressable onPress={() => navigate('Notifications')}>
                    <FontAwesome name="bell-o" size={21} color={COLORS.black_color} />
                </Pressable> */}
                <Pressable onPress={() => navigate('OrdersStack')} style={{ marginLeft: '3%' }}>
                    <MaterialCommunityIcons name="cart-outline" size={22} color={COLORS.black_color} />
                </Pressable>
            </View>
        </View>
    )
}
//
export default HomeHeader;
//
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingHorizontal: "4%",
        paddingVertical: LAY_OUT.padding,
        borderBottomColor: COLORS.gray_color
    },
    logoCon: {
        width: 100,
        height: 27,
        justifyContent: 'flex-start',
        // backgroundColor: 'yellow'
    },
    iconsCon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})
