//
import React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { StyleSheet, Text, View } from 'react-native';
//
const PaperTextInput = (props) => {
    return (
        <TextInput
            style={[styles.container]}
            {...props}
            mode="outlined"
            outlineColor={COLORS.black_color}
            selectionColor={COLORS.primary_color}
            activeOutlineColor={COLORS.primary_color}
        />
    )
}
//
export default PaperTextInput;
//
const styles = StyleSheet.create({
    container: {
        marginBottom: '5%',
        backgroundColor: COLORS.bg_primary,
    }
})
//