//
import React from 'react';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
//
import { useDispatch } from 'react-redux';
import { sliceText } from '../../../../utils';
import { useNavigation } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { changeActiveTab, changeSelectBrand, changeSelectSubCategory } from '../../../../ReduxStore/ProductScreenSlice';
//
const { width } = Dimensions.get('screen');
//
const FilterBox = ({ title = 'Category', selectItem = 'Select Item' }) => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    //
    const navigateMainProductsScreen = () => {
        if (title == "Shop") {
            navigate('MainProductsScreen', {
                screen: "Shops"
            })
            return
        }
        title == "Category" ?
            navigate('MainProductsScreen', {
                screen: "Categories"
            })
            :
            navigate('MainProductsScreen', {
                screen: "Brands"
            });
    }
    //
    return (
        <Pressable style={styles.container} onPress={navigateMainProductsScreen}>
            <Text style={styles.titleText}>
                {title}
            </Text>
            <View style={LAY_OUT.flex_row}>
                <Text style={styles.selectItemText}>
                    {sliceText(selectItem, 10)}
                </Text>
                <MaterialCommunityIcons name="select-place" size={18} style={styles.selectItemText} color='gray' />
            </View>
        </Pressable>
    )
}

export default FilterBox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '2%',
        borderRightWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    titleText: {
        fontSize: 12,
        fontWeight: '300',
        letterSpacing: 0.6
    },
    selectItemText: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
})
