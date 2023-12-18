//
import React, { useMemo, useState } from 'react';
import { Devider } from '../../../../components';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LAY_OUT, COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { formDataGenerator } from '../../../../utils';
import { fetchPostAuthData } from '../../../../API';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
//
const AddressCard = ({ id, UAID, title, state, region, landmark, additional_information, selectAddress, changeSelectAddress = () => { }, reloadScreen = () => { } }) => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const addressInformation = { id, UAID, title, state, region, landmark, additional_information };
    //
    const onSelectAddress = () => {
        changeSelectAddress(addressInformation)
    }
    //
    const isActive = useMemo(() => {
        return selectAddress.id == id
    }, [selectAddress])
    //
    const editAddress = () => {
        navigate("AddressFormScreen", {
            params: { addressInformation, status: "update" }
        })
    }
    //
    const deleteAddress = async () => {
        const adressID = { UAID: UAID }
        console.log("adressID", adressID);
        const formData = await formDataGenerator(adressID);
        const res = await fetchPostAuthData("buyer/address/delete", formData, setLoading);
        console.log("STATUS", res);
        navigate("AddressesScreen");
        reloadScreen();
    }
    //
    return (
        <Pressable onPress={onSelectAddress} style={[styles.addressContainer, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
            <View style={[LAY_OUT.flex_row, { paddingHorizontal: '3%' }]} >
                <Pressable onPress={onSelectAddress}>
                    <RadioButton isActive={isActive} />
                </Pressable>
                <Text style={styles.addressTitle}>
                    {isActive ? 'Default Address' : 'Address'}
                </Text>
                <Pressable onPress={deleteAddress}>
                    {
                        loading ?
                            <ActivityIndicator size="large" />
                            :
                            <AntDesign name="delete" size={23} color="red" />
                    }
                </Pressable>
            </View>
            <Devider />
            {/* personal info */}
            <View style={{ paddingHorizontal: "3%" }}>
                <Text style={styles.title}>
                    {title} Address Info
                </Text>
                <Text style={styles.description}>
                    Country : Somalia,
                    State : {state.name},
                    Region: {region.name}.
                </Text>
                <Text style={styles.description}>
                    Near By : {landmark},
                    Address Description: {additional_information},
                </Text>
                <Devider height={10} />
                <View style={styles.contorlsCon}>
                    <Pressable onPress={editAddress} style={{ alignSelf: "flex-end" }}>
                        <Feather name="edit" size={25} color={COLORS.primary_color} />
                    </Pressable>
                    <View style={styles.statusCard}>
                        <Text style={styles.statusTxt}>
                            {isActive ? "Selected" : "Select This Address"}
                        </Text>
                    </View>
                </View>
            </View>
            <Devider height={7} />
        </Pressable>
    )
}

export default AddressCard;

const RadioButton = ({ isActive }) => {
    return (
        <View style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 40, borderColor: COLORS.primary_color, justifyContent: 'center', alignItems: 'center' }}>
            {
                isActive &&
                <View style={{ width: 18, height: 18, borderRadius: 40, backgroundColor: COLORS.primary_color }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        padding: '3%',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '5%',
        borderColor: COLORS.gray_color
    },
    addressTitle: {
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.8,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.8,
    },
    description: {
        fontSize: 14,
        marginTop: '2%',
        fontWeight: '400',
        letterSpacing: 0.5,
    },
    contorlsCon: {
        columnGap: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    statusCard: {
        borderRadius: 50,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.light_green_color,
    },
    statusTxt: {
        fontSize: 14,
        fontWeight: "300",
        letterSpacing: 0.6,
    },
    editBtn: {
        padding: '3%',
        borderRadius: 7,
        borderWidth: 0.9,
        borderColor: COLORS.primary_color,
    },
})
