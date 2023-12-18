import React from 'react'
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const Header = ({ icon1 = null, label = 'screen', icon2 = 'bell', icon3 = 'shopping-cart' }) => {
    //
    const navigation = useNavigation();
    //
    const goBack = () => {
        navigation.goBack()
    }
    const goToNavigations = () => {
        navigation.navigate('Notifications')
    }
    const goToCart = () => {
        navigation.navigate('OrdersStack')
    }
    //
    return (
        <View style={styles.container}>
            <View style={LAY_OUT.flex_row}>
                {
                    icon1
                    &&
                    <TouchableOpacity onPress={goBack} style={{ marginRight: "2%", }}>
                        <AntDesign name={icon1} size={23} color='gray' />
                    </TouchableOpacity>
                }
                <Text style={styles.labelTxt}>
                    {label}
                </Text>
            </View>
            {/* left icons */}
            <View style={LAY_OUT.flex_row}>
                {/* {
                    icon2
                    &&
                    <TouchableOpacity onPress={goToNavigations}>
                        <Feather name={icon2} size={20} style={{ marginRight: "2%" }} />
                    </TouchableOpacity>
                } */}
                {
                    icon3
                    &&
                    <TouchableOpacity onPress={goToCart}>
                        <Feather name={icon3} size={20} style={{ marginRight: "2%" }} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color,
        paddingHorizontal: "4%",
        paddingVertical: LAY_OUT.padding,
    },
    labelTxt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.7,
        color: COLORS.black_color,
        textTransform: 'capitalize'
    }
})
