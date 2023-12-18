import React from 'react';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ title = 'Click me!', isLoading = false, clickHandler = () => { }, style = {}, textColor = "#fff" }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={clickHandler} style={[styles.container, { ...style }]}>
            {
                isLoading ?
                    <ActivityIndicator color="#ffffff" /> :
                    <Text style={[styles.btnText, { color: textColor }]}>
                        {title}
                    </Text>
            }
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 5,
        paddingVertical: '3%',
        borderWidth: 1,
        borderColor: COLORS.primary_color,
        backgroundColor: COLORS.primary_color,
    },
    btnText: {
        fontSize: 17,
        // color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 1
    }
})
