//
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { sliceText } from '../../../../utils';

const InfoCard = ({ label, value }) => {
    const { navigate } = useNavigation();
    const onEditInfo = () => {
        navigate('UserInfoForm')
    }
    return (
        <Pressable onPress={onEditInfo} style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <View style={LAY_OUT.flex_row}>
                <Text style={styles.value}>
                    {sliceText(value, 20)}
                </Text>
                <AntDesign name="right" size={23} color={COLORS.gray_color} />
            </View>
        </Pressable>
    )
}

export default InfoCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '3.7%',
        borderBottomWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    label: {
        fontSize: 16,
        color: 'gray',
        letterSpacing: 1,
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        letterSpacing: 1,
        marginRight: '3%',
        fontWeight: '500',
        color: COLORS.black_color,
    }
})
