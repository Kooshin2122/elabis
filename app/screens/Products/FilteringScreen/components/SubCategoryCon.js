//
import React, { useState } from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectableCategoryCon from './SelectableCategoryCon';
//
const SubCategoryCon = ({ title, categories = [], changeSelectedItems = () => { } }) => {
    //
    const [activeSubCategory, setActiveSubCategory] = useState(true)
    const changeActibeSubCategoty = () => {
        setActiveSubCategory(!activeSubCategory)
    }
    //
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={changeActibeSubCategoty} style={styles.titleCon} activeOpacity={0.6}>
                <Text>{title}</Text>
                <AntDesign name={activeSubCategory ? 'down' : 'right'} size={15} />
            </TouchableOpacity>
            {
                activeSubCategory &&
                <View style={[styles.categoriesCon]}>
                    {
                        categories.map((item) => (
                            <SelectableCategoryCon key={item.categoryName} {...item} changeSelectedItems={changeSelectedItems} />
                        ))
                    }
                </View>
            }
        </View>
    )
}
//
export default SubCategoryCon;
//
const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 0.7,
        borderColor: COLORS.gray_color,
        marginBottom: '4%',
        backgroundColor: COLORS.bg_primary
    },
    titleCon: {
        padding: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoriesCon: {
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        minHeight: 80,
        borderTopWidth: 0.7,
        borderColor: COLORS.gray_color,
    }
})
//