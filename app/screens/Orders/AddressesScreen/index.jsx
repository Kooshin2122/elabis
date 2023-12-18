//
import React, { useCallback, useEffect, useState } from 'react';
import AddressCard from './components/AddressCard';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { CustomButton, Devider, ListEmptyComponent, LoadingIndicator, LoadingModal, SubHeader } from '../../../components';
import { Dimensions, FlatList, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchGetAuthData } from '../../../API';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { changePersonalInfo, changeDeliveryAddress } from '../../../ReduxStore/OrdersSlice';
import { readData, storeData } from '../../../utils/localStorage/AsyncStorage';
//
const AddressesScreen = () => {
    const dispatch = useDispatch();
    const { navigate, goBack } = useNavigation();
    const [addresses, setAddresses] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({ id: null });
    //
    const changeDefaultAddress = async () => {
        // goBack();
        if (selectedAddress.id) {
            navigate('OrdersStack', { initial: false, screen: "CheckOut", })
            const addressInfo = { UAID: selectedAddress.UAID, id: selectedAddress.id, title: selectedAddress.title, state: selectedAddress.state, region: selectedAddress.region, landmark: selectedAddress.landmark, additional_information: selectedAddress.additional_information, }
            dispatch(changeDeliveryAddress(addressInfo));
            await storeData("DefaultAddress", addressInfo);
        }
        else {
            alert("Please Select an Address or Add New One")
        }
    }
    //
    const getAddressesAsync = async () => {
        try {
            setIsLoading(true);
            const res = await fetchGetAuthData("buyer/address/view", setAddresses);
            // console.log("res-------", res);
            setIsLoading(false);
            // await console.log("res-------------->", res.data);
            if (res?.status == "success")
                setAddresses(res?.data)
        } catch (error) {
            setIsLoading(false);
            console.log(`error happen when getting Address Data in the AddressesScreen `);
        }
    }
    //
    useFocusEffect(useCallback(() => {
        getAddressesAsync();
    }, []));
    //
    return (
        <SafeAreaView style={styles.container} >
            {isLoading && <LoadingModal />}
            <SubHeader title="Addresses" backTo="CheckOut" />
            <ScrollView refreshControl={<RefreshControl onRefresh={getAddressesAsync} />} style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <Devider />
                <View style={styles.head}>
                    <View style={styles.titileContainer}>
                        <Text style={styles.title}>
                            Select your default address
                        </Text>
                    </View>
                    <Pressable onPress={() => navigate("AddressFormScreen")} style={styles.addAddressBtn}>
                        <Fontisto
                            name="plus-a"
                            size={16} color="#ffffff"
                        />
                        <Text style={styles.addAddressBtnTxt}>
                            Add New One
                        </Text>
                    </Pressable>
                </View>
                <Devider />
                {/* {
                    allAddressesAPIendPoint.map((item) => <AddressCard key={item.id} {...item} selectAddress={selectedAddress} changeSelectAddress={setSelectedAddress} />)
                } */}
                <FlatList
                    data={addresses}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => (
                        <ListEmptyComponent message="No Addresses Found Please Add New Address" >
                            <CustomButton title="Add New Address" clickHandler={() => navigate("AddressFormScreen")} />
                        </ListEmptyComponent>
                    )}
                    renderItem={({ item }) => <AddressCard key={item.id} {...item} selectAddress={selectedAddress} changeSelectAddress={setSelectedAddress} reloadScreen={getAddressesAsync} />}
                />
                <Devider />
            </ScrollView>
            <View style={styles.controlsCon}>
                <Pressable onPress={changeDefaultAddress} disabled={false}>
                    <Text style={{ color: '#f43f5f' }}>
                        APPLY CHANGES
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
//
export default AddressesScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingHorizontal: LAY_OUT.paddingX
    },
    titileContainer: {
        flex: 1,
        padding: '3%',
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    title: {
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 0.8,
    },
    addAddressBtn: {
        flex: 0.6,
        columnGap: 4,
        padding: '3%',
        borderRadius: 5,
        borderWidth: 0.7,
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.primary_color,
        backgroundColor: COLORS.primary_color,
    },
    addAddressBtnTxt: {
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.4,
        color: "#ffffff"
    },
    controlsCon: {
        padding: '4%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.bg_tertiary
    },
    head: {
        columnGap: 10,
        flexDirection: "row",
        alignItems: "center",
    }

})
