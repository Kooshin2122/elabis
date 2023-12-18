//
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAppContext } from '../../../context';
import { fetchGetAuthData } from '../../../API';
import { useFocusEffect } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { readData } from '../../../utils/localStorage/AsyncStorage';
import { ImageViewer, LoginModal, RemoveAccountModal, SettingCards } from './components';
import { Devider, Header, LoadingIndicator, ModalContainer } from '../../../components';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const SettingScreen = ({ route }) => {
    //
    const { navigate } = useNavigation();
    const [notifToggle, setNotifToggle] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRemoveAccountModalVisible, setIsRemoveAccountModalVisible] = useState(false);
    const { userData, isUserLogin, setIsUserLogin, setUserData } = useAppContext();
    //
    const getTokenAsync = async () => {
        const res = await readData('userInfo');
        if (res) {
            setIsUserLogin(true);
            const res = await fetchGetAuthData("buyer/user/view", setUserData);
            console.log("User info -------", res);
        }
    }
    //
    useEffect(() => {
        getTokenAsync();
    }, [])
    //
    return (
        <SafeAreaView style={styles.container}>
            <Header label="Settings" />
            {/* <LoadingIndicator /> */}
            <ScrollView style={styles.scrollCon}>
                <Devider height={23} />
                {/* Profile Container */}
                <View style={styles.profileContainer}>
                    <ImageViewer />
                    <Devider />
                    {
                        isUserLogin ?
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.userName}>
                                    {userData?.name}
                                </Text>
                                <TouchableOpacity onPress={() => navigate('EditProfile')} style={styles.editBtn} activeOpacity={0.6} >
                                    <Text style={styles.editBtnTxt}>
                                        Edit Profile
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <Pressable onPress={() => navigate('AuthStack')} style={styles.loginBtn}>
                                <Text style={styles.loginBtnTxt}>
                                    sign-in
                                </Text>
                            </Pressable>
                    }
                </View>
                <Devider />
                {/* Setting Cards Container */}
                <View style={styles.settingCardsContainer}>
                    {/* <SettingCards leftIconName="bell" label="General Notification" switchValue={notifToggle} onSwitchValueChange={setNotifToggle} /> */}
                    <SettingCards leftIconName="unlock" label="Privacy & Policy" rightIconName="right" clickHandler={() => navigate('PrivacyAndPolocy')} />
                    <SettingCards leftIconName="help-circle" label="Help-Center" rightIconName="right" clickHandler={() => navigate('HelpCenter')} />
                    {
                        isUserLogin ?
                            <SettingCards leftIconName="log-out" label="Log-Out" rightIconName="right" clickHandler={() => setIsLoginModalVisible(!isLoginModalVisible)} />
                            :
                            null
                    }
                    {
                        isUserLogin ?
                            <SettingCards leftIconName="trash-2" label="Remove Account" rightIconName="right" clickHandler={() => setIsRemoveAccountModalVisible(!isRemoveAccountModalVisible)} />
                            :
                            null
                    }
                </View>
            </ScrollView>
            {
                isLoginModalVisible ?
                    <ModalContainer>
                        <LoginModal modalVisible={isLoginModalVisible} changeModalVisible={setIsLoginModalVisible} />
                    </ModalContainer>
                    : null
            }
            {
                isRemoveAccountModalVisible ?
                    <ModalContainer>
                        <RemoveAccountModal modalVisible={isRemoveAccountModalVisible} changeModalVisible={setIsRemoveAccountModalVisible} />
                    </ModalContainer>
                    : null
            }
        </SafeAreaView>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    profileContainer: {
        paddingBottom: '5%',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    loginBtn: {
        paddingVertical: '3%',
        paddingHorizontal: '8%',
        borderRadius: 5,
        backgroundColor: COLORS.primary_color,
    },
    loginBtnTxt: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '500',
        textTransform: 'uppercase'
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.7,
    },
    editBtn: {
        marginTop: '3%',
        paddingVertical: '2.5%',
        paddingHorizontal: '5%',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: COLORS.primary_color
    },
    editBtnTxt: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.7,
        textAlign: "center",
        color: COLORS.primary_color,
    }
    // ----------
})
