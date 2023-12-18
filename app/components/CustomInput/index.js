//
import React, { useState } from 'react';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
//
const CustomInput = ({
    name = '',
    value = '',
    label = '',
    returnKeyType = "next",
    keyboardType = 'default',
    numberOfLines = 1,
    placeholder = "",
    isMultiLine = false,
    secureTextEntry = false,
    showEyeIcon = false,
    defaultValue,
    reference,
    required = '*',
    onChangeText = () => { },
    onSubmitEditing = () => { },
}) => {
    const [hideText, setHideText] = useState(false)
    const [showPassword, setShowPassword] = useState(secureTextEntry)
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
                <Text style={{ color: required == " (optional)" ? 'black' : 'red', }}>
                    {required}
                </Text>
            </Text>
            <View style={styles.textFeildCon}>
                <TextInput
                    value={value}
                    label={label}
                    multiline={isMultiLine}
                    ref={reference}
                    defaultValue={defaultValue}
                    blurOnSubmit={false}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    numberOfLines={numberOfLines}
                    returnKeyType={returnKeyType}
                    onChangeText={onChangeText(name)}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={showPassword}
                    style={styles.textFeild}
                />
                {
                    showEyeIcon &&
                    <Pressable onPress={() => {
                        setShowPassword(!showPassword)
                        setHideText(!hideText)
                    }}>
                        <Ionicons name={hideText ? 'eye-outline' : 'eye-off-outline'} size={23} />
                    </Pressable>
                }
            </View>
        </View>
    )
}

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        paddingVertical: "2.6%",
    },
    label: {
        fontSize: 17,
        letterSpacing: 2,
        // fontWeight: '500',
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
