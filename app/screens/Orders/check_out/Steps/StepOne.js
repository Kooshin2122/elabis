//
import * as yup from 'yup';
import { Formik } from 'formik';
import { useFocusEffect } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import image from '../../../../../assets/images/step1.png';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { CustomInput, Devider, MasketFeild } from '../../../../components';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { fetchGetAuthData } from '../../../../API';

const formVerificationSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
})

// Main Function ------------------------------------------------------------
const StepOne = ({ changeCurrentPosition = () => { } }) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState();
    //
    const getUserInfoAsync = async () => {
        const res = await fetchGetAuthData("buyer/user/view");
        setUserInfo(res.data[0]);
    }
    //
    useFocusEffect(useCallback(() => {
        getUserInfoAsync();
    }, []))
    // OnClick Next
    const onNext = (values) => {
        changeCurrentPosition(1);
        // dispatch(changePersonalInfo(values));
    }
    //
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer} >
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <Text style={styles.desc}>
                    Please provide with us personal information just your name and phone number if you have email its good to provide it as well
                </Text>
            </View>
            <Devider />
            <View style={styles.userInfoCon}>
                <UserInfoView label="Full-Name" value={userInfo?.name} />
                <UserInfoView label="Mobile Number" value={userInfo?.phone_number} />
                <UserInfoView label="Email" value={userInfo?.email} />
            </View>
            <Devider />
            <Pressable onPress={onNext} style={styles.nextBtnCon}>
                <Text style={styles.nextBtnTxt}>
                    Next
                </Text>
            </Pressable>
        </View>
    )
}
//
export default StepOne;
//
const UserInfoView = ({ label, value }) => {
    const { navigate } = useNavigation();
    const OnEditPersonalInfo = () => {
        navigate("SettingStack", {
            initial: false,
            screen: "UserInfoForm",
            params: { parentScreen: "CheckOut" },
        })
    }
    return (
        <Pressable onPress={OnEditPersonalInfo} style={styles.userInfoViewCon}>
            <View style={{ rowGap: 3 }}>
                <Text style={styles.lblTxt}>
                    {label}
                </Text>
                <Text style={styles.vleTxt}>
                    {value}
                </Text>
            </View>
            <Feather name="edit" size={23} color={COLORS.primary_color} />
        </Pressable>
    )
}
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
    },
    descriptionContainer: {
        paddingBottom: '2%',
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: 150,
    },
    desc: {
        fontSize: 15,
        color: 'gray',
        fontWeight: '300',
        letterSpacing: 0.7,
        textAlign: 'center',
    },
    formContainer: {
        paddingHorizontal: '2%',
        paddingBottom: '10%'
    },
    userInfoCon: {
        padding: "3%",
        borderRadius: 7,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    userInfoViewCon: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: "3%",
        borderBottomWidth: 0.7,
        justifyContent: "space-between",
        borderBottomColor: COLORS.gray_color,
    },
    lblTxt: {
        fontSize: 15,
        color: "gray",
        fontWeight: "500",
        letterSpacing: 0.6,
    },
    vleTxt: {
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 0.6,
        color: COLORS.black_color,
    },
    nextBtnCon: {
        borderRadius: 40,
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


{/* Formik Data
            <Formik
                initialValues={personalInformation}
                validationSchema={formVerificationSchema}
                onSubmit={onNext}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return (
                        <View style={styles.formContainer}>
                            <CustomInput
                                name='fullName'
                                label='Full Name'
                                value={values.fullName}
                                placeholder="Enter Your Full Name"
                                onChangeText={handleChange}
                                onSubmitEditing={() => feildTwo.current.focus()}
                                required={errors.fullName ? ` (${errors.fullName})` : '*'}
                            />
                            <MasketFeild
                                name='phoneNumber'
                                label='Phone Number'
                                value={values.phoneNumber}
                                reference={feildTwo}
                                placeholder="(XX) X-XX-XX-XX"
                                onChangeText={handleChange}
                                onSubmitEditing={() => feildThree.current.focus()}
                                required={errors.phoneNumber ? ` (${errors.phoneNumber})` : '*'}
                                mask={['(', /[6-7]/, /[1-9]/, ')', ' ', /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            />
                            <CustomInput
                                name='email'
                                label='Email (optional)'
                                required=''
                                value={values.email}
                                reference={feildThree}
                                keyboardType="email-address"
                                placeholder="Enter Your Email"
                                onChangeText={handleChange}
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
            </Formik> */}