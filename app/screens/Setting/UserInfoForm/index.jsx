//
import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { formDataGenerator } from '../../../utils';
import { useNavigation } from '@react-navigation/core';
import { fetchGetAuthData, fetchPostAuthData } from '../../../API';
import { CustomInput, Devider, LoadingModal, SubHeader } from '../../../components';
import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../../context';
//
const UserInfoForm = ({ route }) => {
    //
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const { userData, setUserData, } = useAppContext();
    const parentScreen = route?.params?.parentScreen;
    const formData = { name: userData.name, phone_number: userData.phone_number, email: userData.email }
    // main function;
    const onSaveData = async (values) => {
        const formData = await formDataGenerator(values);
        // UPDATE USER BASIC INFO DATA
        const res = await fetchPostAuthData('buyer/user/update', formData, setLoading);
        // console.log("response --------->", res);
        // GET USER INFO 
        await fetchGetAuthData("buyer/user/view", setUserData);
        parentScreen ?
            navigate("OrdersStack", {
                initial: false,
                screen: parentScreen,
            })
            :
            navigate('EditProfile')
    }
    //
    return (
        <SafeAreaView style={styles.container} >
            <SubHeader title="Form" backTo={parentScreen} />
            {loading && <LoadingModal />}
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={styles.scrollCon}>
                    <Devider />
                    <Devider />
                    <Formik
                        onSubmit={onSaveData}
                        initialValues={formData}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formContainer}>
                                    <CustomInput
                                        name='name'
                                        label='Full Name'
                                        value={values.name}
                                        placeholder="Enter Your Full Name"
                                        onChangeText={handleChange}
                                        required={errors.name ? ` (${errors.name})` : '*'}
                                    />
                                    <CustomInput
                                        name='phone_number'
                                        label='Phone Number'
                                        value={values.phone_number}
                                        placeholder="252 XX X XX XX XX"
                                        onChangeText={handleChange}
                                        keyboardType="numeric"
                                        required={errors.phone_number ? ` (required 7 digits)` : '*'}
                                    />
                                    <CustomInput
                                        name='email'
                                        label='Email (optional)'
                                        required=''
                                        value={values.email}
                                        placeholder="Enter Your Email"
                                        onChangeText={handleChange}
                                    />
                                    <Devider />
                                    <Pressable onPress={handleSubmit} style={styles.nextBtnCon}>
                                        <Text style={styles.nextBtnTxt}>
                                            Save
                                        </Text>
                                    </Pressable>
                                </View>
                            )
                        }}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default UserInfoForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    formContainer: {
        paddingHorizontal: '2%',
        paddingBottom: '10%'
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1,
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
