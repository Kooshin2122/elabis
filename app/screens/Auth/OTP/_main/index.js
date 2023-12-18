//
import { Formik } from 'formik';
import React, { useState } from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { AuthHeader, CustomButton, PaperTextInput, Devider } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const OTPscreen = ({ navigation, route }) => {
    const { phoneNumber } = route.params;
    const [resError, setResError] = useState(false);
    const OTP_Values = { box1: '', box2: '', box3: '', box4: '' }
    //
    const onConfirmOTP = (values) => {
        setResError(!resError)
        navigation.navigate('CreatePassword')
        // console.log('values', values);
    }
    //
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView style={styles.scrollCon}>
                    <AuthHeader />
                    <Devider height={25} />
                    <Formik
                        onSubmit={onConfirmOTP}
                        initialValues={OTP_Values}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.OTPtitle}>
                                        ENTER OTP
                                    </Text>
                                    <Devider height={10} />
                                    <Text style={styles.OTPdesc}>
                                        Enter the One-Time Pin sent to this ({phoneNumber}) phone number
                                    </Text>
                                    <Devider />
                                    <View style={styles.OTP_Container}>
                                        <PaperTextInput
                                            maxLength={1}
                                            error={resError}
                                            value={values.box1}
                                            keyboardType="number-pad"
                                            style={styles.OTP_Input}
                                            onChangeText={handleChange("box1")}
                                        />
                                        <PaperTextInput
                                            maxLength={1}
                                            error={resError}
                                            value={values.box2}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            onChangeText={handleChange("box2")}
                                        />
                                        <PaperTextInput
                                            maxLength={1}
                                            error={resError}
                                            value={values.box3}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            onChangeText={handleChange("box3")}
                                        />
                                        <PaperTextInput
                                            maxLength={1}
                                            error={resError}
                                            value={values.box4}
                                            keyboardType="numeric"
                                            style={styles.OTP_Input}
                                            onChangeText={handleChange("box4")}
                                        />
                                    </View>
                                    <CustomButton clickHandler={handleSubmit} title="Next" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <Text onPress={() => navigation.pop()} style={styles.backHomeTxt}>
                        Back to Login
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default OTPscreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        padding: '4%',
    },
    formCon: {
        minHeight: 200,
        padding: '4%',
        paddingBottom: '6%',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color
    },
    backHomeTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.primary_color
    },
    OTPtitle: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    OTPdesc: {
        fontSize: 17,
        fontWeight: '400',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    OTP_Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    OTP_Input: {
        width: '20%',
        marginBottom: '5%',
        textAlign: 'center',
        backgroundColor: COLORS.bg_primary,
    }
})
//