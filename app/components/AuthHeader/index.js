//
import React from 'react';
import Devider from '../Devider';
import logo from '../../../assets/images/logo.png';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, StyleSheet, Text, View } from 'react-native';
//
const AuthHeader = () => {
    const navigation = useNavigation();
    return (
        <View>
            <AntDesign onPress={() => navigation.pop()} name="left" size={25} />
            <Devider />
            {/* Logo */}
            <View style={styles.logoCon}>
                <Image
                    source={logo}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        </View>
    )
}
//
export default AuthHeader;
//
const styles = StyleSheet.create({
    appName: {
        fontSize: 17,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: COLORS.primary_color,
    },
    logoCon: {
        width: 140,
        height: 47,
        alignSelf: "center",
        justifyContent: "center",
        // backgroundColor: 'yellow'
    },
})
//