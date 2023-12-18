//
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SearchModal = () => {
    const [searchingValue, setSearchingValue] = useState('');
    const changeHandler = (value) => {
        setSearchingValue(value)
    }
    return (
        <View style={styles.container}>
            <Fontisto name="search" size={23} color="gray" />
            <TextInput
                value={searchingValue}
                placeholder={`Search Your Car Model`}
                style={styles.searchInput}
                onChangeText={changeHandler}
            />
        </View>
    )
}

export default SearchModal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 0.7,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        borderRadius: 7,
        borderColor: COLORS.gray_color
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '300',
        letterSpacing: 1,
        marginLeft: '3%',
        paddingVertical: '3%',
    }
})
