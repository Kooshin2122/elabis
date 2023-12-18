//
import React, { useEffect, useState } from 'react';
import { fetchGetAuthData, fetchPostAuthData } from '../../../API';
import { Devider, LoadingModal, SubHeader } from '../../../components';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
//
import evcLogo from '../../../../assets/images/Services/Evc.jpeg';
import { formDataGenerator } from '../../../utils';
//
const OrderDetailsScreen = ({ route }) => {
    //
    const UOID = route?.params?.UOID;
    const [details, setDetails] = useState();
    const [userInfo, setUserInfo] = useState();
    const [statusTxt, setStatusTxt] = useState();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    //
    const getOrderDetailsAsync = async () => {
        try {
            setLoading(true);
            const userInfo = await fetchGetAuthData("buyer/user/view");
            setUserInfo(userInfo.data[0]);
            const payload = { UOID: UOID };
            const formData = await formDataGenerator(payload);
            const res = await fetchPostAuthData("buyer/cart/order/view/all", formData);
            Object.values(res?.data).map(key => {
                setDetails(key[0])
                // console.log("order details ---------- ...........", key[0]);
            })
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(`Error happen when fetching order details in O-D-S -----> ${error}`);
        }
    }
    //
    const generateStatusTxt = (status) => {
        if (status < 0)
            return "hdwqdwhq"
        else if (status == 1)
            return "Your order is pending"
        else if (status == 2)
            return "Seller accepted your order"
        else if (status == 3)
            return "Delivery guy accepted your order"
        else if (status == 4)
            return "Delivery guy picked up your order"
        else if (status == 5)
            return "Now your order is completed"
    }
    //
    useEffect(() => {
        getOrderDetailsAsync();
    }, [])
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Order Details" />
            {
                loading && <LoadingModal />
            }
            <ScrollView
                style={styles.scrollCon}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={getOrderDetailsAsync} />}

            >
                <View style={{ padding: "3.5%" }}>
                    {/* Adress Container */}
                    <View style={styles.addressContainer}>
                        <Text style={styles.checkAddress}>
                            Check Your Address and your order status
                        </Text>
                        <Devider />
                        {/* personal info */}
                        <View>
                            <View style={LAY_OUT.flex_row} >
                                <Text style={styles.title}>
                                    Personal Information
                                 </Text>
                            </View>
                            <Text style={styles.description}>
                                Name : {userInfo?.name},
                                Phone-Number: {userInfo?.phone_number},
                                Email: {userInfo?.email}
                            </Text>
                        </View>
                        <Devider />
                        {/* Address Info */}
                        <View>
                            <View style={LAY_OUT.flex_row} >
                                <Text style={styles.title}>
                                    Address Information
                                </Text>
                            </View>
                            <Text style={styles.description}>
                                Country : Somalia,
                                State: {details?.state},
                                Region: {details?.region},
                                Near By: {details?.landmark},
                                Description: {details?.additional_information}
                            </Text>
                        </View>
                        <Devider />
                        {/* Address Info */}
                        <View>
                            <View style={LAY_OUT.flex_row} >
                                <Text style={styles.title}>
                                    Order Status
                                </Text>
                            </View>
                            <Text style={styles.description}>
                                Status : {generateStatusTxt(details?.status)}
                            </Text>
                        </View>
                    </View>
                    <Devider />
                    {/* Payment Buttons */}
                    <View style={styles.paymentContainer}>
                        <Text style={styles.checkAddress}>
                            Product Information
                        </Text>
                        <Devider />
                        <ItemListView title="Product Name" value={details?.name} />
                        <ItemListView title="Color" value={details?.color} />
                        <ItemListView title="Size" value={details?.size} />
                        <ItemListView title="Brand" value={details?.brand} />
                        <ItemListView title="Single price" value={details?.price} />
                        <ItemListView title="Product Quantity" value={details?.quantity} />
                        <ItemListView title="Total Product Price" value={details?.quantity * details?.price} />
                    </View>
                    <Devider />
                    {/* Payment Info */}
                    {/* <View style={styles.paymentContainer}>
                        <Text style={styles.checkAddress}>
                            Payment Information
                        </Text>
                        <Devider />
                        <ItemListView title="Service Price" value="$0.2" />
                        <ItemListView title="Delivery Price" value="$1" />
                        <ItemListView title="Product Price" value="$10" />
                        <ItemListView title="Total Price" value="$11.2" />
                    </View> */}
                </View>
                {/* <Devider height={100} /> */}
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default OrderDetailsScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
    },
    addressContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray_color
    },
    checkAddress: {
        fontSize: 14,
        fontWeight: '300',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
    },
    description: {
        fontSize: 13,
        marginTop: '2%',
        fontWeight: '300',
    },
    imageContainer: {
        width: 120,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.primary_color,
    },
    paymentContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray_color
    },
    itemListView: {
        paddingVertical: "3%",
        paddingHorizontal: "2%",
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color,
    }
});
//
const ItemListView = ({ title = "Title", value = "value" }) => {
    //
    let color;
    if (title == "Color") color = value.toLowerCase();
    //
    return (
        <View style={[LAY_OUT.flex_row, styles.itemListView]} >
            <Text style={styles.paymentTitle}>
                {title}
            </Text>
            {
                title == "Color" ?
                    <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: color }} />
                    :
                    <Text style={styles.paymentTitle}>
                        {value}
                    </Text>
            }
        </View>
    )
}
//