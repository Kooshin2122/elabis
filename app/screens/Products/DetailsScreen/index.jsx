//
import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import { formDataGenerator, sliceText } from '../../../utils';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ImageCarousel, ProductDetailCard } from './components';
import { SubHeader, Devider, Container, LoadingModal, PaperTextInput, CustomButton, ProductCard, ListEmptyComponent } from '../../../components';
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchGetData, fetchPostAuthData, fetchPostData } from '../../../API';
import { useAppContext } from '../../../context';
// // import { getDistance, } from "geolib"
// import Geolocation from 'react-native-geolocation-service';
import { readData } from '../../../utils/localStorage/AsyncStorage';
//
const { width, height } = Dimensions.get('screen');
//

//notifications
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log("token.........................................", token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token.data;
}
//notifications ends here
const ProductDetailsScreen = ({ route }) => {
    //
    const [loading, setLoading] = useState();
    const [images, setImages] = useState([]);
    const [counter, setCounter] = useState(1);
    const { navigate, goBack } = useNavigation();
    const [distance, setDistance] = useState(0);
    const [shopData, setShopData] = useState([]);
    const [location1, setLocation1] = useState(null);
    const [location2, setLocation2] = useState(null);
    const [productData, setProductData] = useState();
    const [shopProducts, setShopProducts] = useState([]);
    const { userLocation, setUserLocation, } = useAppContext();
    const [productsLoading, setProductsLoading] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    //
    const { UPID, parentScreen } = route.params;
    //
    const decreasement = () => {
        if (counter <= 1)
            return
        setCounter(counter - 1)
    }
    const onIncreasement = () => {
        if (counter >= productData?.quantity_avaliable)
            return
        setCounter(counter + 1)
    }
    //

    const getUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            console.log("Status---------", status);
            Location.getCurrentPositionAsync().then(location => {
                console.log("Location-------->", location);
                setUserLocation(location);
            }).catch((error) => console.log("error--", error))
            // setUserLocation(location);
        } catch (error) {
            console.log("error happen when getting permision in the expo", error);
        }
    }
    //
    const getSignleProductDataAsync = async () => {
        try {
            setLoading(true);
            const response = await fetchGetData(`buyer/products/view/${UPID}`)
            // console.log("Products Data..................", response?.data[0]);
            setProductData(response?.data[0]);
            setImages(response?.images);
            setLoading(false);
            const shopRes = await fetchGetData(`buyer/shop/view/${response.data[0]?.shop_id}`);
            setShopData(shopRes?.data);
            const shopId = { USID: shopRes?.data.USID }
            const formData = await formDataGenerator(shopId);
            setProductsLoading(true);
            const products = await fetchPostData("buyer/shop/products", formData);
            setShopProducts(products?.data)
            setProductsLoading(false);
            const shopLocation = { latitude: shopRes?.data.latitude, longitude: shopRes?.data.longitude }
            // console.log("shopLocation.............", shopRes?.data);
            setLocation2(shopLocation);
            calculateDistance(shopLocation);
        } catch (error) {
            console.log("Fetch Error Ayaa ka jiro Details Screenks", error);
        }
    }

    //
    useEffect(() => {
        getSignleProductDataAsync()
        getUserLocation();
    }, [])
    //
    const addToCart = async () => {
        const token = await readData("userInfo");
        // check if the user login
        if (token == null) {
            navigate("AuthStack")
            return
        }
        //
        const cartData = {
            UPID: productData?.UPID,
            quantity: counter,
        }
        //
        const formData = formDataGenerator(cartData);
        const res = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading);
        //
        if (res.status == "added successfully") {
            goBack();
            navigate("OrdersStack")
        }
        else if (res?.status == "A open Cart is not avaliable") {
            const creatCart = await fetchPostAuthData("buyer/cart/create",)
            const response = await fetchPostAuthData("buyer/cart/product/add", formData, setLoading)
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token) => {
            const tokenn = await readData("userInfo");
            // check if the user login
            if (tokenn == null) {
                return
            }
            setExpoPushToken(token)
            try {
                const payload = { fcm: token };
                const formData = formDataGenerator(payload);
                fetchPostAuthData('buyer/user/updateFCM', formData)
                    .then(res => {
                        console.log("push token update result------------>", res)
                    });
            } catch (error) {
                console.log("Error happen when updating FCM Token in App.js");
            }
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    //
    return (
        <SafeAreaView style={styles.container}>
            {loading && <LoadingModal />}
            <SubHeader title="Product Details" backTo={parentScreen} />
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} >
                    {/* image Carousel */}
                    <ImageCarousel images={images} />
                    <View style={styles.contentContainer}>
                        <Devider />
                        <ProductDetailCard
                            distance={distance}
                            name={shopData?.name}
                            addToCart={addToCart}
                            email={shopData?.email}
                            UPID={productData?.UPID}
                            photo={shopData?.photos}
                            landmark={shopData?.landmark}
                            phone_number={shopData?.phone_number}
                        />
                        <Devider height={10} />
                        {/* item information */}
                        <View style={styles.itemInfoMainContainer} >
                            <Text style={styles.title}>
                                Item Info
                            </Text>
                            <ItemContainer title="Color" color={productData?.color} />
                            <ItemContainer title="Size" value={`${productData?.size}`} />
                            <ItemContainer title="Single Price" value={`$${productData?.price}`} />
                            <ItemContainer title="Available Quantities" value={productData?.quantity_avaliable} />
                            <ItemContainer title="Brand" value={productData?.brand?.name} />
                            <ItemContainer title="Category" value={productData?.category?.name} />
                            <ItemContainer title="Item Type" value={productData?.productcategory.name} />
                        </View>
                        <Devider />
                        {/* Product Details */}
                        <View style={styles.itemInfoMainContainer}>
                            <Text style={styles.title}>
                                Product Details
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', letterSpacing: 0.5, color: "gray" }}>
                                {productData?.description}
                            </Text>
                        </View>
                        <Devider />
                        {/* Controls */}
                        <View style={styles.contorllsContainer}>
                            <View style={styles.contorllsHead}>
                                <View>
                                    <Text style={styles.counterTxt}>
                                        {counter}
                                    </Text>
                                    <Text style={styles.subTitle}>Quantity</Text>
                                </View>
                                <View>
                                    <Text style={styles.totalPrice}>
                                        ${productData?.price * counter}
                                    </Text>
                                    <Text style={styles.subTitle}>Total Price</Text>
                                </View>
                            </View>
                            <Devider />
                            <View style={styles.quantityControls}>
                                <Pressable onPress={decreasement} style={[styles.box, { borderRightWidth: 1, }]}>
                                    <AntDesign name="minus" size={25} />
                                </Pressable>
                                <View style={styles.counterView}>
                                    <Text style={[styles.counterTxt, { textAlign: "center", fontSize: 22 }]}>
                                        {counter}
                                    </Text>
                                </View>
                                <Pressable onPress={onIncreasement} style={styles.box}>
                                    <AntDesign name="plus" size={25} />
                                </Pressable>
                            </View>
                            <Devider />
                            <CustomButton
                                title="Add On Cart"
                                clickHandler={addToCart}
                            />
                        </View>
                        <Devider />
                        {productsLoading && <ActivityIndicator size="large" color={COLORS.primary_color} />}
                        <FlatList
                            numColumns={2}
                            data={shopProducts}
                            scrollEnabled={false}
                            initialNumToRender={8}
                            scrollIndicatorInsets={8}
                            keyExtractor={(item) => item.UPID}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.productsCon}
                            renderItem={({ item }) => <ProductCard {...item} hideCart={true} parentScreen="ProductsScreen" />}
                            ListHeaderComponent={() => (
                                <ListHeader name={shopData?.name} shopProducts={shopProducts} />
                            )}
                            ListEmptyComponent={() => (
                                <ListEmptyComponent title="Sorry" message={"Helo"} />
                            )}
                        />
                        <Devider />
                        <Devider />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '3%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_tertiary
    },
    iconCon: {
        width: 37,
        height: 37,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00000097",
        // opacity: 0.8
        // backgroundColor: COLORS.black_color
    },
    contentContainer: {
        zIndex: 1000,
        paddingTop: "1%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: COLORS.bg_primary,
        paddingHorizontal: LAY_OUT.paddingX,
    },
    proName: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.9,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 18, fontWeight: "500",
        marginBottom: 5, letterSpacing: 1,
        color: COLORS.black_color,
    },
    itemInfoMainContainer: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '3%',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray_color,
    },
    contorllsContainer: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    contorllsHead: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    quantityControls: {
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
    },
    box: {
        padding: '4%',
        borderLeftWidth: 0.7,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    counterView: {
        flex: 1,
        alignItems: "center",
    },
    counterTxt: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primary_color
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: "right",
        color: COLORS.primary_color
    },
    subTitle: {
        fontSize: 14,
        color: "gray",
        fontWeight: "400",
    },
    paymentsControls: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        padding: '3%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary_color,
    },
    priceTxt: {
        fontSize: 17,
        fontWeight: '500',
        color: "#ffffff"
    },
    price: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center'
    },
    productsCon: {
        // padding: "3%"
    },
    resultCon: {
        borderRadius: 7,
        borderWidth: 0.7,
        paddingLeft: "4%",
        marginVertical: "3%",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "2%",
        borderColor: COLORS.gray_color,
        justifyContent: "space-between",
    },
    resultTxt: {
        fontWeight: "bold",
        letterSpacing: 0.8,
        textTransform: "capitalize"
    },
    proLenghtCon: {
        padding: '4%',
        borderRadius: 7,
        borderLeftWidth: 0.7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    resutCounter: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.3,
        textTransform: "uppercase",
        color: COLORS.primary_color
    },
})
//
const ItemContainer = ({ title, value, color = "" }) => {
    //
    const navigation = useNavigation();
    const bgColor = color.toLowerCase();
    // console.log("bgColor......", bgColor);

    //
    return (
        <View style={styles.itemContainer}>
            <Text style={{ fontWeight: '300', fontSize: 15, color: "gray" }}>
                {title}
            </Text>
            {
                color ?
                    <View style={{ width: 20, height: 20, borderRadius: 40, backgroundColor: bgColor }} />
                    :
                    <Text style={{ fontWeight: '400', fontSize: 15, color: "#394043" }}>
                        {value}
                    </Text>
            }

        </View>
    )
}
const ListHeader = ({ name, shopProducts }) => {
    return (
        <View style={styles.resultCon}>
            <Text style={styles.resultTxt}>
                {name} products
            </Text>
            <View style={styles.proLenghtCon}>
                <Text style={styles.resutCounter}>
                    {shopProducts?.length}
                </Text>
            </View>
        </View>
    )
}
// getParent().setOptions({ tabBarStyle: { display: 'none' } })
// return () => {
//     getParent().setOptions({
//         tabBarStyle: {
//             display: 'flex',
//             borderTopColor: 'rgba(0, 0, 0, .2)',
//             paddingTop: Platform.OS === 'android' ? 15 : 10,
//             paddingBottom: Platform.OS === 'android' ? 15 : 30,
//             height: Platform.OS === 'android' ? 70 : 90,
//         }
//     })
// }

{/* <Text>Quantity</Text>
                        <View style={styles.quantityControls}>
                            <Pressable onPress={decreasement} style={styles.box}>
                                <AntDesign name="minus" size={25} />
                            </Pressable>
                            <Text style={styles.counterTxt}>
                                {counter}
                            </Text>
                            <Pressable onPress={onIncreasement} style={styles.box}>
                                <AntDesign name="plus" size={25} />
                            </Pressable>
                        </View>
                        <Devider />
                        <View style={styles.paymentsControls}>
                            <View style={styles.btn}>
                                <Text style={styles.priceTxt}>
                                    Pay Now
                                </Text>
                                <FontAwesome name="money" size={20} color='#fff' style={{ marginLeft: 10 }} />
                            </View>
                            <Text style={styles.price}>
                                $ {productData?.price * counter}
                            </Text>
                            <Pressable onPress={addToCart} style={styles.btn}>
                                <Text style={styles.priceTxt}>
                                    Add Cart
                                </Text>
                                <MaterialCommunityIcons name="cart-check" size={20} color='#fff' style={{ marginLeft: 10 }} />
                            </Pressable>
                        </View> */}