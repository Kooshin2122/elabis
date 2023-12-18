import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchGetData } from '../../../../API';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import CategoriesCard from './CategoriesCard';
//
const CategoriesContainer = ({ subCategoryName, categories = [] }) => {
    //
    return (
        <View style={styles.container}>
            <Text style={styles.subCategoryName}>
                {subCategoryName}
            </Text>
            <View style={styles.categoriesContainer}>
                {
                    categories.map((category) => <CategoriesCard key={category.id} {...category} />)
                }
            </View>
        </View>
    )
}
//
export default CategoriesContainer;
//
const styles = StyleSheet.create({
    container: {
        marginBottom: 1
    },
    subCategoryName: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5
    },
    categoriesContainer: {
        paddingTop: '5%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
