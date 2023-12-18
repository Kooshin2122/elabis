//
import React, { useState } from 'react';
import { fetchPostAuthData } from '../../../../API';
import { useNavigation } from '@react-navigation/core';
import AntDesign from "react-native-vector-icons/AntDesign";
import { formDataGenerator, sliceText } from '../../../../utils';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { readData } from '../../../../utils/localStorage/AsyncStorage';
//
const { width, height } = Dimensions.get('screen');
//
const ProductDetailCard = ({ id, UPID, name, email, distance, landmark, photo, phone_number, addToCart = () => { } }) => {
    //
    const { navigate } = useNavigation();
    const [heartLoading, setHeartLoading] = useState(false);
    //
    const onAddToWishList = async () => {
        const token = await readData("userInfo");
        // // check if the user login
        if (token == null) {
            navigate("AuthStack")
            return
        }
        //
        const payload = { UPID };
        // console.log("payload", payload);
        const formData = await formDataGenerator(payload);
        const result = await fetchPostAuthData("buyer/wishlist/add", formData, setHeartLoading);
        // console.log("result", result);
    }
    //
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                style={styles.imageContainer}

                source={{ uri: `https://api.elabis.app/storage/images/shops/${photo}` }}
            >
                <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(33, 25, 25, 0.01)", borderRadius: 7 }} />
            </ImageBackground>
            {/* Content Container ------------------------------------------------- */}
            <View style={styles.contentContainer}>
                {/* Section One --------------------------------------------------- */}
                <View style={styles.sectionOne}>
                    <Text style={styles.proName}>
                        From {name}
                    </Text>
                    {/* <Pressable onPress={onAddToWishList} style={styles.addWishListCon}>
                        {
                            heartLoading ?
                                <ActivityIndicator size={20} />
                                :
                                <MaterialCommunityIcons name="cards-heart-outline" size={18} color={COLORS.black_color} />
                        }
                    </Pressable> */}
                </View>
                {/* Section Two --------------------------------------------------- */}
                <View style={styles.sectionTwo}>
                    <Text style={styles.itemInfo}>
                        Located: {landmark}
                    </Text>
                    <Text style={styles.itemInfo}>
                        Email: {email}
                    </Text>
                    <Text style={styles.itemInfo}>
                        Phone Number: {phone_number}
                    </Text>
                </View >
                {/* Section Three --------------------------------------------------- */}
                {/* <View style={styles.sectionThree}>
                    <MaterialCommunityIcons
                        size={23}
                        name="social-distance-2-meters"
                    />
                    <Text style={styles.itemInfo}>
                        {distance < 1 ? `${distance.toFixed(0)} meters` : `${distance.toFixed(2)} km`}
                    </Text>
                    <MaterialCommunityIcons
                        size={23}
                        name="social-distance-2-meters"
                    />
                </View> */}
            </View>
        </View>
    )
}
//
export default ProductDetailCard;
//
const styles = StyleSheet.create({
    container: {
        marginBottom: '5%',
        paddingBottom: "3%",
        flexDirection: 'row',
        borderBottomWidth: 0.7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    imageContainer: {
        height: 100,
        borderRadius: 7,
        width: width / 3.4,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    img: {
        height: "100%",
        width: '100%',
        borderRadius: 5,
    },
    // Contents ---------------------------------------------
    contentContainer: {
        flex: 1,
        marginLeft: '2%',
        // justifyContent: 'space-between',
    },
    // Section One --------------->
    sectionOne: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    proName: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5
    },
    addWishListCon: {
        borderRadius: 4,
        borderWidth: 0.7,
        padding: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.black_color
    },
    addCartCon: {
        flex: 1,
        padding: '3%',
        columnGap: 5,
        borderRadius: 4,
        borderWidth: 0.7,
        flexDirection: "row",
        alignItems: 'center',
        borderColor: COLORS.primary_color,
    },
    // Section Two --------------->
    sectionTwo: {
        // top: -5,
        // position: "relative",
    },
    itemInfo: {
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 0.7,
        color: "gray"
    },
    // Section Three --------------->
    sectionThree: {
        // marginTop: '2%',
        columnGap: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    oldPrice: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500',
        textDecorationLine: 'line-through'
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.primary_color
    },
    discountCon: {
        paddingVertical: '1%',
        paddingHorizontal: '6%',
        borderRadius: 40,
        backgroundColor: '#f7847f'
    },
    counterCo: {
        flex: 0.7,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        backgroundColor: COLORS.bg_tertiary
    },
    counterText: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: '3%'
    }
})
//