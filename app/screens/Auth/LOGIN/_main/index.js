//
import { Formik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AuthHeader, CustomButton, Devider, LoadingModal, PaperTextInput } from '../../../../components';
import { fetchPostAuthData, fetchPostData } from '../../../../API';
import { formDataGenerator } from '../../../../utils';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { storeData, readData } from '../../../../utils/localStorage/AsyncStorage';
import { useAppContext } from '../../../../context';


//send notifications ends here
const LoginScreen = () => {
    //
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [resError, setResError] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);
    const { setIsUserLogin, setUserData } = useAppContext();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    //
    const loginInfo = { email: '', password: '' };
    //

    const onLogin = async (values) => {
        setResError(false);
        setLoading(true);
        try {
            const formData = await formDataGenerator(values);
            // Fetch request;
            const data = await fetchPostData('buyer/user/signin', formData, setResError);
            await console.log('data------------>', data);
            if (data?.message == 'Unauthorized') {
                setResError("incorrect email or passowrd")
                setLoading(false);
                return;
            }
            if (data?.email) {
                setResError(data.email);
                setLoading(false);
                return;
            }
            if (data?.password) {
                setResError(data.password);
                setLoading(false);
                return;
            }
            // Store Data
            await storeData("userInfo", data);
            const result = await readData("userInfo");
            // await console.log('result', result);
            if (result.access_token) {
                setIsUserLogin(true)
                setUserData(result.user)
                const createCartRes = await fetchPostAuthData("buyer/cart/create");
                // console.log("createCartRes---------------------->", createCartRes);
                //

                // try {
                //     const payload = { fcm: expoPushToken };
                //     const formData = formDataGenerator(payload);
                //     fetchPostAuthData('buyer/user/updateFCM', formData)
                //         .then(res => console.log("Token------------>", res));
                // } catch (error) {
                //     console.log("Error happen when updating FCM Token in App.js");
                // }

                navigate('SettingStack');
                //
                setLoading(false);
                return
            }
            setResError("Error happen please try again");
            //
            //
            setLoading(false);
        } catch (error) {
            console.log(`error ayaa ka jiro loging screenka --------> ${error}`);
            setLoading(false)
        };

    }
    //
    return (
        <SafeAreaView style={styles.container}>
            {loading && <LoadingModal />}
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
                        onSubmit={onLogin}
                        initialValues={loginInfo}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.loginTitle}>
                                        LOGIN
                                    </Text>
                                    <Devider />
                                    {/* <PaperTextInput
                                        error={resError}
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                    /> */}
                                    <PaperTextInput
                                        label="Email"
                                        error={resError}
                                        placeholder="Email"
                                        value={values.email}
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                    />
                                    <PaperTextInput
                                        label="Password"
                                        error={resError}
                                        placeholder="Password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                    />
                                    {
                                        resError &&
                                        <View style={styles.errorCon}>
                                            <Octicons name="stop" size={20} color="red" />
                                            <Text style={styles.errorText}>
                                                {resError}
                                            </Text>
                                        </View>
                                    }
                                    <Text onPress={() => navigate('ResetPassword')} style={styles.forgotPasswordTxt}>
                                        Forgot Password?
                                    </Text>
                                    <CustomButton clickHandler={handleSubmit} title="LOGIN" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text style={styles.signUpTxt1}>
                            New to Elabis?
                        </Text>
                        <Text onPress={() => navigate('SignUpScreen')} style={styles.signUpTxt2}>
                            Sign Up Now
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default LoginScreen;
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
    loginTitle: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    errorCon: {
        columnGap: 5,
        marginLeft: '1%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: '1%',
        color: "red"
    },
    forgotPasswordTxt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: '1%',
        marginBottom: '7%',
        color: COLORS.black800
    },
    signUpCon: {
        columnGap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpTxt1: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.3,
        color: COLORS.black800
    },
    signUpTxt2: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
        color: COLORS.primary_color
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: COLORS.black800
    },
    mediaCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 30
    },
})
//

