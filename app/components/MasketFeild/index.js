//
import React, { useState } from 'react';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const MasketFeild = ({ name = '', value = '', label = '', mask = [], reference, required = '*', placeholder, onChangeText = () => { }, onSubmitEditing = () => { }, }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
                <Text style={{ color: 'red', }}>
                    {required}
                </Text>
            </Text>
            <View style={styles.textFeildCon}>
                <MaskInput
                    mask={mask}
                    name={name}
                    value={value}
                    ref={reference}
                    returnKeyType="next"
                    style={styles.textFeild}
                    placeholder={placeholder}
                    keyboardType="decimal-pad"
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={onChangeText(name)}
                />
            </View>
        </View>
    )
}

export default MasketFeild;

const styles = StyleSheet.create({
    container: {
        paddingVertical: "2.6%",
    },
    label: {
        fontSize: 17,
        letterSpacing: 2,
        // fontWeight: '300',
    },
    textFeildCon: {
        paddingRight: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.9,
        borderBottomColor: COLORS.gray_color,
    },
    textFeild: {
        flex: 1,
        paddingVertical: '2%',
        letterSpacing: 1,
        fontSize: 14,
        fontWeight: '300',
        // backgroundColor: 'blue'
    },
})
