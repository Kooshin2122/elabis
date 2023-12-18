import React from 'react'
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SubHeader = ({ title = 'Title', backTo = null }) => {
    //
    const navigation = useNavigation();
    // console.log("backTo--", backTo);
    //
    const backToPreviousScreen = () => {
        if (backTo == "OrdersStack")
            navigation.navigate("OrdersStack");
        else if (backTo == "CheckOut")
            navigation.navigate('OrdersStack', { initial: false, screen: "CheckOut", })
        else if (backTo == "ProductsScreen") {
            navigation.navigate('ProductStack', { initial: false, screen: "ProductsScreen", })
        }
        else if (backTo == "WishListScreen")
            navigation.navigate("WishListScreen")
        else if (backTo)
            navigation.navigate("Home")
        navigation.goBack();
        backTo = null
    }
    //
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} onPress={backToPreviousScreen} style={styles.iconCon}>
                <AntDesign name="left" size={24} />
            </TouchableOpacity>
            <View style={styles.titleCon}>
                <Text style={styles.titleTxt}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export default SubHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: LAY_OUT.padding,
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        backgroundColor: COLORS.bg_primary,
        borderBottomColor: COLORS.gray_color
    },
    iconCon: {
        flex: 0.1,
        paddingRight: '5%',
        // backgroundColor: 'blue'
    },
    titleCon: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'gray',
    },
    titleTxt: {
        fontSize: 16,
        marginLeft: -50,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
})
