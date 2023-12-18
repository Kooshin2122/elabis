import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { fetchGetAuthData } from '../../../API';
import { SettingCards } from '../_main/components';
import { ImagePicker, InfoCard } from './components';
import { Devider, SubHeader } from '../../../components';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { useAppContext } from '../../../context';

const EditProfile = () => {
    const { getParent, navigate } = useNavigation();
    const { userData, setUserData, } = useAppContext();
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="profile" />
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                <ImagePicker profilePic={userData?.profile_picture} />
                <Text style={styles.title}>
                    Basic Information
                </Text>
                {/* Basic Info Container */}
                <View style={styles.basicInfoCon}>
                    <InfoCard label="Name" value={userData?.name} />
                    <InfoCard label="Phone" value={userData?.phone_number} />
                    <InfoCard label="Email" value={userData?.email} />
                </View>
                <Text style={styles.title}>
                    Account Setting
                </Text>
                <View style={styles.accountSettingCon}>
                    {/* <SettingCards label="Add New Address" clickHandler={() => navigate('OrdersStack', { intial: false, screen: "AddressesScreen" })} leftIconName="plus-square" rightIconName="right" /> */}
                    <SettingCards label="Change Password" clickHandler={() => navigate('ChangePassword')} leftIconName="unlock" rightIconName="right" />
                </View>
                {/* Scroll padding bottom */}
                <Devider />
                <Devider />
                <Devider />
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_secondary
    },
    title: {
        fontSize: 16,
        padding: '3%',
        letterSpacing: 1,
    },
    basicInfoCon: {
        paddingTop: '4%',
        paddingBottom: '6%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_primary
    },
    accountSettingCon: {
        paddingTop: '4%',
        paddingBottom: '6%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.bg_primary
    }
})


// <InfoCard label="Country" value="Somalia" />
//                     <InfoCard label="City" value="Mogadisho" />
//                     <InfoCard label="Village" value="Ciise Qodax" />
//                     <InfoCard label="Address Discription" value="" />