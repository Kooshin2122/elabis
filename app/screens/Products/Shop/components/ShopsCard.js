//
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { CustomButton, Devider } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { sliceText } from '../../../../utils';
import { useNavigation } from '@react-navigation/core';
//
const ShopsCard = ({ id, USID, name, phone_number, email, photos, }) => {
    //
    const { navigate } = useNavigation();
    //
    const navigateThisShopProductsScreen = () => {
        navigate("ProductStack", {
            initial: false,
            screen: "ShopProductsScreen",
            params: { USID: USID, name: name },
        })
    }
    //
    return (
        <View style={styles.container}>
            {/* image container */}
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 7, }}
                    source={{ uri: `https://api.elabis.app/storage/images/shops/${photos}` }}
                />
            </View>
            {/* content container */}
            <View style={styles.contentContainer}>
                <View style={styles.head}>
                    <Text style={styles.shopName}>
                        {sliceText(name, 17)}
                    </Text>
                    <Entypo name="shop" size={20} color={COLORS.primary_color} />
                </View>
                <Devider height={9} />
                <View style={styles.contactsCon}>
                    <Text style={styles.contactsTxt}>
                        Phone: {phone_number}
                    </Text>
                    <Devider height={2} />
                    <Text style={styles.contactsTxt}>
                        Email: {email}
                    </Text>
                </View>
                <Devider height={10} />
                <Pressable onPress={navigateThisShopProductsScreen} style={styles.shopBtn}>
                    <Text style={styles.btnTxt}>View Products</Text>
                </Pressable>
            </View>
        </View>
    )
}
//
export default ShopsCard;
//
const styles = StyleSheet.create({
    container: {
        padding: "3%",
        columnGap: 10,
        borderRadius: 5,
        borderWidth: 0.7,
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.gray_color
    },
    imageContainer: {
        width: 140,
        height: 120,
        borderRadius: 7,
        backgroundColor: COLORS.bg_secondary,
        // backgroundColor: "blue"
    },
    contentContainer: {
        flex: 1,
        paddingTop: "1%"
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    contactsCon: {
        paddingVertical: "3%",
        borderTopWidth: 0.6,
        // borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    shopName: {
        fontSize: 15,
        fontWeight: "600",
        letterSpacing: 0.5
    },
    contactsTxt: {
        fontSize: 13,
        fontWeight: "300"
    },
    shopBtn: {
        padding: "4%",
        borderRadius: 5,
        borderWidth: 0.7,
        alignItems: "center",
        borderColor: COLORS.primary_color
    },
    btnTxt: {
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.6,
        color: COLORS.primary_color
    }
});
//