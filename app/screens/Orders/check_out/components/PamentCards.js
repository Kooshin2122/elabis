//
import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomInput, Devider, MasketFeild } from '../../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { changePaymentInfo } from '../../../../ReduxStore/OrdersSlice';
import { getServiceMask } from '../../../../utils';
//
const formVerificationSchema = yup.object().shape({
    phoneNumber: yup.string().required("required"),
})
//
const PamentCards = ({ id, serviceName, payment_method, companyName, imageUrl, expand = false, changeCurrentPosition = () => { }, changeSelectPayment = () => { } }) => {
    //
    const dispatch = useDispatch()
    const { paymentInfo } = useSelector((state) => state.ordersSlice)
    const initialData = { phoneNumber: paymentInfo.serviceName == serviceName ? paymentInfo.phoneNumber : null };
    // Next Button
    const onNextHandler = (values) => {
        changeCurrentPosition(3)
        const paymentInformation = { serviceName, payment_method, phoneNumber: values.phoneNumber, imageUrl }
        dispatch(changePaymentInfo(paymentInformation))
    }
    // Click on cards
    const onSelectPayment = () => {
        changeSelectPayment(serviceName)
    }
    //
    return (
        <TouchableOpacity onPress={onSelectPayment} style={styles.container} activeOpacity={0.6} >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.flexRomCon}>
                    <View style={styles.imageCon}>
                        <Image
                            source={imageUrl}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%', borderRadius: 5, }}
                        />
                    </View>
                    <Text style={styles.serviceName}>
                        {serviceName}
                    </Text>
                    <Text style={styles.companyName}>
                        ({companyName})
                    </Text>
                </View>
                <AntDesign name="checksquare" size={23} color={expand ? '#000' : COLORS.gray_color} />
            </View>
            {/* Form */}
            <Formik
                validationSchema={formVerificationSchema}
                initialValues={initialData}
                onSubmit={onNextHandler}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return (
                        <View style={[styles.formContainer, { display: expand ? 'flex' : 'none' }]}>
                            {/* <CustomInput
                                name='phoneNumber'
                                label='payment number'
                                value={values.phoneNumber}
                                placeholder="XXX-X-XX-XX-XX"
                                onChangeText={handleChange("phoneNumber")}
                            /> */}
                            <MasketFeild
                                name='phoneNumber'
                                label='payment number'
                                value={values.phoneNumber}
                                onChangeText={handleChange}
                                mask={getServiceMask(companyName).mask}
                                placeholder={getServiceMask(companyName).placeHolder}
                                required={errors.phoneNumber ? ` (${errors.phoneNumber})` : '*'}
                            />
                            <Devider />
                            <Pressable onPress={handleSubmit} style={styles.nextBtnCon}>
                                <Text style={styles.nextBtnTxt}>
                                    Next
                                </Text>
                            </Pressable>
                        </View>
                    )
                }}
            </Formik>
        </TouchableOpacity>
    )
}
//
export default PamentCards;
//
const styles = StyleSheet.create({
    container: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '5%',
        borderColor: COLORS.gray_color
    },
    imageCon: {
        width: 110,
        height: 55
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRomCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    serviceName: {
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 0.7,
        marginLeft: '2%'
    },
    companyName: {
        fontSize: 15,
        fontWeight: '300',
        letterSpacing: 0.3,
        marginLeft: '1%'
    },
    formContainer: {
        paddingTop: '2%',
        paddingHorizontal: '3%'
    },
    nextBtnCon: {
        borderRadius: 5,
        paddingVertical: '3%',
        backgroundColor: COLORS.primary_color
    },
    nextBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
})
