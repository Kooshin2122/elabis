import React, { useEffect, useState } from 'react';
import Devider from '../Devider';
import { formDataGenerator, sliceText } from '../../utils';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchPostAuthData } from '../../API';
import { readData, removeData, storeData } from '../../utils/localStorage/AsyncStorage';
//
const { height } = Dimensions.get('screen');
//
const ProductCard = ({ id, UPID, shop_id, name, brand, price, photo, rating, quantity_avaliable, parentScreen = null, hideCart = false, reloadScreen = () => { } }) => {
    //
    const { navigate, goBack, getParent } = useNavigation();
    const [isInCart, setIsInCart] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [isInWishList, setIsInWishList] = useState(false);
    const [heartLoading, setHeartLoading] = useState(false);
    //
    const navigateDetailsScreen = () => {
        let isHasParent = getParent().canGoBack();
        //
        isHasParent && goBack()
        //
        navigate('ProductStack', {
            screen: 'DetailsScreen',
            initial: false,
            params: {
                UPID,
                parentScreen,
            }
        });
    }
    //
    const onAddToCart = async () => {
        const token = await readData("userInfo");
        // check if the user login
        if (token == null) {
            navigate("AuthStack")
            return
        }
        //
        const cartData = {
            UPID: UPID,
            quantity: 1,
        }
        //
        const formData = formDataGenerator(cartData);
        const res = await fetchPostAuthData("buyer/cart/product/add", formData, setCartLoading);
        //
        if (res.status == "added successfully")
            setIsInCart(true);
        else if (res?.status == "A open Cart is not avaliable") {
            const creatCart = await fetchPostAuthData("buyer/cart/create",)
            const response = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading)
        }
    }
    //
    const storeWishListProductsAsync = async () => {
        //
        const productToBeSaved = UPID
        const existingProducts = await readData("wishListProducts");
        // console.log("existingProducts---------->", existingProducts);
        //
        let newProduct = [productToBeSaved]
        if (existingProducts) {
            const check = existingProducts.find(element => element === productToBeSaved);
            check ? newProduct = existingProducts : newProduct = [...existingProducts, productToBeSaved];
        }
        // Store Data
        await storeData("wishListProducts", newProduct);
        // await removeData("wishListProducts");
    }
    const removeWishListProductAsync = async () => {
        //
        const productToBeSaved = UPID
        const existingProducts = await readData("wishListProducts");
        // console.log("existingProducts---------->", existingProducts);
        //
        let newProducts = existingProducts;
        if (existingProducts) {
            newProducts = existingProducts.filter(element => element !== productToBeSaved);
            console.log("newProducts---------->", newProducts);
        }
        // // Store Data
        await storeData("wishListProducts", newProducts);
        // // await removeData("wishListProducts");
    }
    //
    const onAddToWishList = async () => {
        const token = await readData("userInfo");
        if (token == null) {
            navigate("AuthStack")
            return
        }
        const payload = { UPID };
        const formData = await formDataGenerator(payload);
        storeWishListProductsAsync();
        setIsInWishList(true);
        const res = await readData("userInfo");
        if (res) {
            const result = await fetchPostAuthData("buyer/wishlist/add", formData, setHeartLoading);
        }
        else navigate("AuthStack")
    }
    //
    const onRemoveFromWishList = async () => {
        const token = await readData("userInfo");
        if (token == null) {
            navigate("AuthStack")
            return
        }
        const payload = { UPID };
        const formData = await formDataGenerator(payload);
        removeWishListProductAsync();
        setIsInWishList(false);
        const res = await readData("userInfo");
        if (res) {
            const result = await fetchPostAuthData("buyer/wishlist/remove", formData, setHeartLoading);
            console.log("Result-------", result);
        }
        else navigate("AuthStack");
    }
    //
    const checkProductIsInWishListAsync = async () => {
        const res = await readData("wishListProducts");
        res?.filter((id) => {
            if (id == UPID) {
                setIsInWishList(true);
            }
        })
    }
    //
    useEffect(() => {
        checkProductIsInWishListAsync();
    }, []);
    //
    return (
        <View style={styles.container}>
            <Pressable onPress={navigateDetailsScreen}>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode="stretch"
                        style={styles.image}
                        source={{ uri: `https://api.elabis.app/storage/images/${photo}` }}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {/* Product Name */}
                    <Text numberOfLines={1} style={styles.proName}>
                        {name}
                    </Text>
                    {/* product Brand Name */}
                    <Devider height={5} />
                    <Text numberOfLines={1} style={styles.proBrandName}>
                        Brand : {brand?.name}
                    </Text>
                    <View style={LAY_OUT.flex_row}>
                        <Text numberOfLines={1} style={styles.proBrandName}>
                            Quantity : {sliceText(quantity_avaliable, 5)}
                        </Text>
                        {/* <Text style={[styles.proBrandName, { letterSpacing: 2, fontWeight: "bold", color: "orange" }]}>
                            <AntDesign name="star" size={12} color="orange" />
                            {rating}.0
                        </Text> */}
                    </View>
                </View>
            </Pressable>
            <Devider height={10} />
            <View style={styles.controlsCon}>
                <View style={[LAY_OUT.flex_row, { alignSelf: 'flex-end' }]}>
                    {/* {
                        heartLoading ? <ActivityIndicator size="small" />
                            :
                            <Pressable onPress={isInWishList ? onRemoveFromWishList : onAddToWishList} style={styles.iconCon}>
                                <MaterialCommunityIcons
                                    size={18}
                                    color={isInWishList ? COLORS.primary_color : "black"}
                                    name={isInWishList ? "cards-heart" : "cards-heart-outline"}
                                />
                            </Pressable>
                    } */}
                    {
                        hideCart &&
                        <View style={styles.iconCon}>
                            {
                                cartLoading ? <ActivityIndicator size="small" />
                                    :
                                    <Pressable onPress={onAddToCart}>
                                        <MaterialCommunityIcons
                                            size={18}
                                            name="cart-plus"
                                            color={isInCart ? COLORS.primary_color : "black"}
                                        />
                                    </Pressable>
                            }
                        </View>
                    }

                </View>
                <Text style={styles.proPrice}>
                    ${price}
                </Text>
            </View>
        </View>

    )
}
//
export default ProductCard;
//
const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        width: '46%',
        padding: '2%',
        borderRadius: 7,
        borderWidth: 0.5,
        marginBottom: '4%',
        marginHorizontal: "2%",
        borderColor: COLORS.gray_color,
        justifyContent: 'space-between',
        backgroundColor: COLORS.bg_primary,
    },
    imageContainer: {
        height: 110,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 7,
    },
    contentContainer: {
        marginTop: '7%'
    },
    proName: {
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 0.8,
        color: COLORS.black_color,
        textTransform: 'uppercase',
    },
    proBrandName: {
        fontSize: 12,
        fontWeight: '300'
    },
    controlsCon: {
        paddingTop: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderColor: COLORS.gray_color,
        justifyContent: 'space-between',
    },
    iconCon: {
        padding: '5%',
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
    },
    proPrice: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: 'flex-end',
        color: COLORS.primary_color
    },
})
