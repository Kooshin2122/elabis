//
import React, { useState } from 'react';
import { Formik } from 'formik';
import { AuthHeader, CustomButton, PaperTextInput, Devider, LoadingModal } from '../../../../components';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { formDataGenerator } from '../../../../utils';
import { fetchPostData } from '../../../../API';
//
const ResetPassword = ({ navigation }) => {
    const resetInfo = { email: '', name: '' }
    const [loading, setLoading] = useState(false);
    const [resMessage, setResMessage] = useState(false);
    //
    const onVerifyEmail = async (values) => {
        setResMessage(false);
        const formData = await formDataGenerator(values);
        // Fetch Request:
        const res = await fetchPostData("buyer/user/resetpassword", formData, setLoading);
        await console.log('res', res);
        if (res?.message) {
            setResMessage(res.message)
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
                        onSubmit={onVerifyEmail}
                        initialValues={resetInfo}
                    // validationSchema={loginVerificationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return (
                                <View style={styles.formCon}>
                                    <Text style={styles.Title}>
                                        RESET PASSWORD
                                    </Text>
                                    <Devider />
                                    {/* <PaperTextInput
                                        label="Mobile Number"
                                        keyboardType="numeric"
                                        placeholder="xx-x-xxx-xxx"
                                        value={values.phoneNumber}
                                        onChangeText={handleChange("phoneNumber")}
                                    /> */}
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
                                    {resMessage && <Text style={styles.messageTxt} >{resMessage}</Text>}
                                    <CustomButton clickHandler={handleSubmit} title="Reset Password" />
                                </View>
                            )
                        }}
                    </Formik>
                    <Devider height={20} />
                    <Text onPress={() => navigation.pop()} style={styles.backHomeTxt}>
                        Go Back
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default ResetPassword;
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
        fontWeight: "600",
        textAlign: 'center',
        color: COLORS.primary_color
    },
    Title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    messageTxt: {
        fontSize: 16,
        padding: '3%',
        color: "#5dad72",
        marginBottom: '4%',
        textAlign: "center",
        backgroundColor: "rgba(93, 173, 114, 0.24)"
    }
})
//

// navigation.navigate('OTPstack', {
//     screen: 'OTP',
//     params: {
//         phoneNumber: values.phoneNumber
//     }
// })