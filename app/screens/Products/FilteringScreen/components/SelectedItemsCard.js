//
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectSubCategory } from '../../../../ReduxStore/ProductScreenSlice';
//
const { width, height } = Dimensions.get('screen')
const SelectedItemsCard = ({ item = 'All', changeSelectedItems = () => { } }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.itemName}>
                {item}
            </Text>
        </View>
    )
}
//
export default SelectedItemsCard;
//
const styles = StyleSheet.create({
    container: {
        columnGap: 10,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        height: height / 27,
        paddingHorizontal: width / 40,
        backgroundColor: COLORS.light_green_color,
    },
    itemName: {
        fontSize: 10,
        fontWeight: 500
    }
})
//