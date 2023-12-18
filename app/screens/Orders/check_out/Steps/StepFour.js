//
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { Devider, LoadingModal, ModalContainer } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { showPaymentLoadingModal } from '../../../../ReduxStore/OrdersSlice';
import { fetchGetAuthData, fetchPostAuthData, paymentProcess } from '../../../../API';
import { formDataGenerator } from '../../../../utils';
import PaymentLoadingModal from '../components/PaymentLoadingModal';
import { PaymentResponseModal } from '../components';
import { readData } from '../../../../utils/localStorage/AsyncStorage';
//
const StepFour = ({ changeCurrentPosition, cartTotal = 0 }) => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [paymentMoney, setPaymentMoney] = useState();
    const [orderToggle, setOrderToggle] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { personalInfo, deliveryAddress, paymentInfo } = useSelector((state) => state.ordersSlice);
    //
    const getUserInfoAsync = async () => {
        try {
            const res = await fetchGetAuthData("buyer/user/view");
            setUserInfo(res.data[0]);
            const addressPayload = { UAID: deliveryAddress.UAID };
            const formData = await formDataGenerator(addressPayload);
            setPaymentLoading(true);
            const response = await fetchPostAuthData("buyer/cart/order/processing", formData);
            setPaymentLoading(false);
            // console.log("Res----------->>", response);
            // console.log("responsedata...........", response);
            if (response.status == "successful")
                setPaymentMoney(response?.data);
        } catch (error) {
            console.log(`error happen in the CheckOut Screen Step Four`);
            setPaymentLoading(false);
        }
    }
    //
    useEffect(() => {
        getUserInfoAsync();
    }, [])
    // On Order Method 
    const OrderMethod = async () => {
        try {
            setOrderToggle(false);
            const orderData = { UAID: deliveryAddress.UAID, account_number: paymentInfo.phoneNumber, payment_method: paymentInfo.payment_method }
            const formData = await formDataGenerator(orderData);
            setLoading(true);
            const res = await paymentProcess("buyer/cart/order", formData);
            console.log("Payment response.............. ", res);
            if (res.status == true) {
                const results = await fetchPostAuthData("buyer/cart/product/removeall", formData,);
            }
            setLoading(false);
            setOrderToggle(true);
            setPaymentResponse(res)
        } catch (error) {
            setLoading(false);
            setOrderToggle(false);
            console.log(`Error happen when IN THE PAYMENT METHOD -----> ${error}`);
        } finally {
            setLoading(false);
        }
    }
    //
    return (
        <View style={styles.mainContainer}>
            {
                orderToggle &&
                <PaymentResponseModal
                    iconName='check-circle'
                    title="Completed successfully"
                    status={paymentResponse?.status}
                    message={paymentResponse?.message}
                    changeModalVisible={setOrderToggle}
                    discription='Thank you for completed order payment, delivery team ships your order.'
                />
            }
            <View style={styles.container}>
                {loading && <PaymentLoadingModal paymentNumber={paymentInfo.phoneNumber} closeModal={setLoading} />}
                <Devider />
                {/* Adress Container */}
                <View style={styles.addressContainer}>
                    <Text style={styles.checkAddress}>
                        Check Your Address
                    </Text>
                    <Devider />
                    {/* personal info */}
                    <View>
                        <View style={LAY_OUT.flex_row} >
                            <Text style={styles.title}>
                                Personal Information
                        </Text>
                            <Pressable onPress={() => changeCurrentPosition(0)} >
                                <Text style={styles.title}>
                                    Edit
                            </Text>
                            </Pressable>
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
                                {deliveryAddress.title} Address Information
                            </Text>
                            <Pressable onPress={() => changeCurrentPosition(1)} >
                                <Text style={styles.title}>
                                    Edit
                            </Text>
                            </Pressable>
                        </View>
                        <Text style={styles.description}>
                            Country : Somalia,
                        State:{deliveryAddress.state?.name},
                        Region:{deliveryAddress.region?.name},
                        Near By:{deliveryAddress.landmark},
                        Description:{deliveryAddress.additional_information}
                        </Text>
                    </View>
                    <Devider />
                    {/* payment Info */}
                    <View>
                        <View style={LAY_OUT.flex_row} >
                            <Text style={styles.title}>
                                Payment Method
                            </Text>
                            <Pressable onPress={() => changeCurrentPosition(2)} >
                                <Text style={styles.title}>
                                    Edit
                                 </Text>
                            </Pressable>
                        </View>
                        <View style={[LAY_OUT.flex_row, { marginTop: '2%', alignItems: 'flex-start' }]}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={paymentInfo.imageUrl}
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <View>
                                <Text style={[styles.description, { alignSelf: 'flex-end' }]}>
                                    {paymentInfo.serviceName}
                                </Text>
                                <Text style={styles.description}>
                                    Payment Number : {paymentInfo.phoneNumber}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Devider />
                {/* Address Buttons */}
                <View style={LAY_OUT.flex_row}>
                    <Pressable style={styles.addressBtn} onPress={() => navigate('AddressesScreen')} >
                        <Text>Select An Other Address</Text>
                    </Pressable>
                    <Pressable style={styles.addressBtn} onPress={() => navigate("AddressFormScreen")}>
                        <Text>Add New Address</Text>
                    </Pressable>
                </View>
                <Devider />
                {/* Payment Buttons */}
                <View style={styles.paymentContainer}>
                    <Text style={styles.checkAddress}>
                        Payment Process
                     </Text>
                    <Devider />
                    {
                        paymentLoading ?
                            <ActivityIndicator size="large" />
                            :
                            <View>
                                <View style={[LAY_OUT.flex_row, styles.priceView]} >
                                    <Text style={styles.paymentTitle}>
                                        Number Of Shops
                                    </Text>
                                    <Text style={styles.paymentTitle}>
                                        {paymentMoney?.shop_wise_price?.length}
                                    </Text>
                                </View>
                                {
                                    paymentMoney?.shop_wise_price?.map((price, index) => {
                                        return (
                                            <View key={index} style={[LAY_OUT.flex_row, styles.priceView]} >
                                                <Text style={styles.paymentTitle}>
                                                    Delivery Price {index + 1}
                                                </Text>
                                                <Text style={styles.paymentTitle}>
                                                    ${price.toFixed(2)}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                                <View style={[LAY_OUT.flex_row, styles.priceView]} >
                                    <Text style={styles.paymentTitle}>
                                        Service Price
                                    </Text>
                                    <Text style={styles.paymentTitle}>
                                        ${paymentMoney?.service_price.toFixed(2)}
                                    </Text>
                                </View>
                                <View style={[LAY_OUT.flex_row, styles.priceView]} >
                                    <Text style={styles.paymentTitle}>
                                        Total Products Price
                                    </Text>
                                    <Text style={styles.paymentTitle}>
                                        ${paymentMoney?.total_product_price.toFixed(2)}
                                    </Text>
                                </View>
                                <View style={[LAY_OUT.flex_row, styles.priceView]} >
                                    <Text style={styles.paymentTitle}>
                                        Total Price
                                    </Text>
                                    <Text style={styles.paymentTitle}>
                                        ${paymentMoney?.total_price.toFixed(2)}
                                    </Text>
                                </View>
                                <View style={[LAY_OUT.flex_row, { marginTop: 10, paddingHorizontal: "2%" }]}>
                                    <Text style={styles.description}>
                                        Payment Number : {paymentInfo.phoneNumber}
                                    </Text>
                                </View>
                                <Devider />
                                {/* Payment Button */}
                                <Pressable onPress={OrderMethod} style={styles.paymentButton} >
                                    <Text style={styles.paymentButtonTxt} >
                                        PAY NOW ${paymentMoney?.total_price.toFixed(2)}
                                    </Text>
                                </Pressable>
                            </View>

                    }
                </View>
            </View>
        </View>
    )
}

export default StepFour;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
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
    addressBtn: {
        width: '48%',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: '3%',
        paddingHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    paymentContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray_color
    },
    paymentTitle: {
        fontSize: 14,
        fontWeight: '400',
    },
    paymentButton: {
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: '3%',
        backgroundColor: COLORS.primary_color
    },
    paymentButtonTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    priceView: {
        paddingVertical: "3%",
        paddingHorizontal: "2%",
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color,
    }
})
