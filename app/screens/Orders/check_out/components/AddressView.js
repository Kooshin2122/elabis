//
import React, { useMemo, useState } from 'react';
import { Devider } from '../../../../components';
import { useNavigation } from '@react-navigation/core';
import Feather from 'react-native-vector-icons/Feather';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LAY_OUT, COLORS } from '../../../../Theme/GLOBAL_STYLES';
//
const AddressView = ({ id, title, state, region, landmark, additional_information }) => {
    //
    const { navigate } = useNavigation();
    const onSelectAddress = () => {
    }
    //
    const isActive = useMemo(() => {
        return true
    }, [])
    //
    return (
        <Pressable onPress={onSelectAddress} style={styles.addressContainer}>
            <View style={[LAY_OUT.flex_row, { paddingHorizontal: '3%' }]} >
                <Pressable onPress={onSelectAddress}>
                    <RadioButton isActive={isActive} />
                </Pressable>
                <Text style={styles.addressTitle}>
                    {isActive ? 'Default Address' : 'Address'}
                </Text>
                <Pressable onPress={() => navigate('AddressFormScreen')} >
                    <Feather name="edit" size={25} color={COLORS.primary_color} />
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
                <Devider height={20} />
                <View style={LAY_OUT.flex_row}>
                    <Pressable style={styles.addressBtn} onPress={() => navigate('AddressesScreen')} >
                        <Text>Select Address</Text>
                    </Pressable>
                    <Pressable style={styles.addressBtn} onPress={() => navigate('AddressFormScreen')}>
                        <Text>Add New Address</Text>
                    </Pressable>
                </View>
            </View>
            <Devider height={7} />
        </Pressable>
    )
}

export default AddressView;

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
    addressBtn: {
        width: '48%',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: '4%',
        paddingHorizontal: '2%',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
})
