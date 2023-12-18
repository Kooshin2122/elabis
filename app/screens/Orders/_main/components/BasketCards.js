//
import React from 'react'
import { fetchPostAuthData } from '../../../../API';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { formDataGenerator, sliceText } from '../../../../utils';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
//
const { width, height } = Dimensions.get('screen');
//
const BasketCard = ({ id, UOID, UPID, name, brand, status, category, quantity, quantity_avaliable, photo, price, reloadData = () => { }, showCancelCartBtn = true, isThereOrderDetail = false }) => {
    //
    const { navigate } = useNavigation();
    const [statusTxt, setStatusTxt] = useState("");
    // alert("Hi")
    //
    const generateStatusTxt = (status) => {
        if (status < 0)
            setStatusTxt("The seller declined your order; please verify your bank account to confirm if the funds have been refunded.")
        else if (status == 1)
            setStatusTxt("Your order is pending")
        else if (status == 2)
            setStatusTxt("Seller accepted your order")
        else if (status == 3)
            setStatusTxt("Delivery guy accepted your order")
        else if (status == 4)
            setStatusTxt("Delivery guy picked up your order")
        else if (status == 5)
            setStatusTxt("Now your order is completed")
    }
    //
    const onViewDetails = () => {
        if (isThereOrderDetail) {
            navigate("OrderDetails", { UOID, UPID })
        }
        else
            navigate('ProductStack', {
                screen: 'DetailsScreen',
                initial: false,
                params: {
                    UPID,
                    parentScreen: "OrdersStack"
                }
            });
    }
    //
    const onRemoveCart = async () => {
        const cartInfo = { UPID: UPID };
        const formData = await formDataGenerator(cartInfo);
        const res = await fetchPostAuthData("buyer/cart/product/remove", formData);
        // console.log("onRemoveCart", res);
        reloadData();
    }
    //
    // useFocusEffect(useCallback(() => {
    //     generateStatusTxt(status);
    // }, [status]));
    //
    useEffect(() => {
        generateStatusTxt(status);
    }, [status])
    //
    return (
        <Pressable onPress={onViewDetails} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.img}
                    resizeMode="contain"
                    source={{ uri: `https://api.elabis.app/storage/images/${photo}` }}
                />
            </View>
            {/* Content Container ------------------------------------------------- */}
            <View style={[styles.contentContainer, { justifyContent: status ? "flex-start" : "space-between" }]}>
                {/* Section One --------------------------------------------------- */}
                <View style={styles.sectionOne}>
                    <Text style={styles.proName}>
                        {sliceText(name, 18)}
                    </Text>
                    {
                        showCancelCartBtn &&
                        <Pressable onPress={onRemoveCart} style={styles.cartRemoveCon}>
                            <MaterialCommunityIcons name="cart-remove" size={14} color="#f7847f" />
                        </Pressable>
                    }
                </View>
                {/* Section Two --------------------------------------------------- */}
                {
                    status ?
                        <Text style={styles.status}>
                            <Text style={{ color: COLORS.primary_color }}>
                                Order Status
                            </Text>
                            : {statusTxt}
                        </Text>
                        :
                        <View style={[styles.sectionThree]}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.price}>
                                    ${price}
                                </Text>
                                <Text style={styles.subtitleTxt}>
                                    Single Price
                                 </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.price}>
                                    {quantity}
                                </Text>
                                <Text style={styles.subtitleTxt}>
                                    Quantity
                                  </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.price}>
                                    ${price * quantity}
                                </Text>
                                <Text style={styles.subtitleTxt}>
                                    Total Price
                        </Text>
                            </View>
                        </View>
                }
            </View>
        </Pressable>
    )
}

export default BasketCard;

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        borderRadius: 7,
        marginBottom: '5%',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary,
    },
    imageContainer: {
        height: 70,
        borderRadius: 5,
        width: width / 4,
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
        justifyContent: 'space-between',
    },
    // Section One --------------->
    sectionOne: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    proName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5
    },
    cartRemoveCon: {
        borderRadius: 4,
        borderWidth: 0.7,
        padding: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#f7847f'
    },
    // Section Two --------------->
    sectionTwo: {
        // marginTop: '2%',
        paddingBottom: "4%",
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    itemInfo: {
        fontSize: 11,
        fontWeight: '400',
        letterSpacing: 0.7,
        color: "gray"
    },
    // Section Three --------------->
    sectionThree: {
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    oldPrice: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500',
        textDecorationLine: 'line-through'
    },
    price: {
        fontSize: 12,
        fontWeight: '500'
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
    },
    subtitleTxt: {
        fontSize: 8,
        color: "gray",
        letterSpacing: 0.7
    },
    status: {
        fontSize: 12,
        fontWeight: "500",
        letterSpacing: 0.5,
        marginTop: "2%",
        color: COLORS.black_color
    }
})

