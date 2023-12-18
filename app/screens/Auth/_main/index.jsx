//
import React from 'react';
import image from '../../../../assets/img1.png';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import { AuthHeader, CustomButton, Devider } from '../../../components';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const WelcomeScreen = () => {
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollCon}>
                <AuthHeader />
                <Devider height={25} />
                <View style={styles.formCon}>
                    <Text style={styles.title}>
                        Welcome
                    </Text>
                    <Devider height={50} />
                    <CustomButton
                        clickHandler={() => navigate('LoginStack')}
                        title="Login"
                        style={styles.loginBtn}
                    />
                    <Devider height={10} />
                    <Text style={styles.sepratortitle}>
                        or
                    </Text>
                    <Devider height={10} />
                    <CustomButton
                        clickHandler={() => navigate('SignUpScreen')}
                        title="Create New Account"
                        style={styles.signUpBtn}
                        textColor={COLORS.black_color}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default WelcomeScreen;
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
    title: {
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 0.8,
        color: COLORS.black800
    },
    loginBtn: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
    },
    signUpBtn: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
        backgroundColor: COLORS.bg_primary
    },
    sepratortitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    formCon: {
        minHeight: 200,
        padding: '4%',
        paddingBottom: '6%',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: COLORS.light_green_color
    },
})
//