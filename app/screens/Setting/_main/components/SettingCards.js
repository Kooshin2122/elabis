//
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingCards = ({ label = '', leftIconName = 'help-circle', rightIconName = null, switchValue, clickHandler = () => { }, onSwitchValueChange = () => { } }) => {
    return (
        <Pressable onPress={clickHandler} style={styles.container}>
            <Feather name={leftIconName} size={23} style={{ marginRight: '3%' }} />
            <Text style={styles.label}>
                {label}
            </Text>
            {
                rightIconName ?
                    <AntDesign name={rightIconName} size={23} color={COLORS.gray_color} />
                    :
                    <Switch value={switchValue} onValueChange={onSwitchValueChange} />
            }
        </Pressable>
    )
}

export default SettingCards;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '3%',
        paddingVertical: '4%',
        borderBottomWidth: 0.7,
        borderColor: COLORS.gray_color,
    },
    label: {
        flex: 1,
        fontSize: 20,
        fontWeight: '300',
        letterSpacing: 0.7,
    }
})
