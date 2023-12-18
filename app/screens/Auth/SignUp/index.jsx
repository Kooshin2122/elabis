//
import { Formik } from 'formik';
import React, { useState } from 'react';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AuthHeader, CustomButton, Devider, LoadingModal, PaperTextInput } from '../../../components';
import { fetchPostData, httpsRequest } from '../../../API';
import { formDataGenerator } from '../../../utils';
import { TextInput } from 'react-native-paper';
//
const SignUpScreen = () => {
    const { navigate } = useNavigation();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [eyeToggle, setEyeToggle] = useState(false);
    const signUpInfo = { name: '', email: '', phone_number: '', password: '' };
    //
    const onSignUp = async (values) => {
        try {
            setError(false);
            const formData = await formDataGenerator(values);
            // Fetch request;
            setLoading(true);
            const data = await fetchPostData('buyer/user/signup', formData, setError);
            // console.log("data------------", data);
            setLoading(false);
            //
            if (data.status == "account created") {
                navigate('LoginStack')
                return
            }
            if (data?.name) {
                setError(data?.name[0]);
                return
            }
            if (data?.email) {
                setError(data?.email[0]);
                return
            }
            if (data?.password) {
                setError(data?.password[0]);
                return
            }
            if (data?.phone_number) {
                setError(data?.phone_number[0]);
                return
            }
            //
        } catch (error) {
            console.log("error=======", error);
            setLoading(false);
        }
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
                        onSubmit={onSignUp}
                        initialValues={signUpInfo}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.Title}>
                                        SIGN-UP
                                    </Text>
                                    <Devider />
                                    <PaperTextInput
                                        label="Full Name"
                                        placeholder="Full Name"
                                        value={values.name}
                                        onChangeText={handleChange("name")}
                                    />
                                    <PaperTextInput
                                        label="Email"
                                        placeholder="Email"
                                        value={values.email}
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                    />
                                    <PaperTextInput
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phone_number}
                                        onChangeText={handleChange("phone_number")}
                                    />
                                    <PaperTextInput
                                        label="Password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        secureTextEntry={eyeToggle ? false : true}
                                        right={<TextInput.Icon onPress={() => setEyeToggle(!eyeToggle)} icon={eyeToggle ? "eye" : "eye-off"} />}
                                    />
                                    {error && <Text style={styles.errorTxt} >{error}</Text>}
                                    <CustomButton clickHandler={handleSubmit} title="SIGN-UP" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <View style={styles.signUpCon}>
                        <Text style={styles.signUpTxt1}>
                            Already have an account?
                        </Text>
                        <Text onPress={() => navigate('LoginStack')} style={styles.signUpTxt2}>
                            Login Now
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default SignUpScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scrollCon: {
        flex: 1,
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
    Title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
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
    termsTxt: {
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.3,
        textAlign: 'center',
        color: COLORS.black800
    },
    errorTxt: {
        fontSize: 16,
        color: "red",
        padding: '3%',
        marginBottom: '4%',
        textAlign: "center",
        backgroundColor: "rgba(181, 4, 4, 0.31)"
    }
})
//

 // navigate('OTPstack', {
        //     screen: 'OTP',
        //     params: {
        //         phoneNumber: values.phoneNumber
        //     }
        // })

// Axios;
        // const res = axios.post('https://sweyn.co.uk/v1/buyer/user/signup', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });