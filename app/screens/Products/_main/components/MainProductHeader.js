import React, { useState } from 'react';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveTab } from '../../../../ReduxStore/ProductScreenSlice';

const MainProductHeader = () => {
    const dispatch = useDispatch();
    const { activeTab } = useSelector((state) => state.productsSlice);
    // 
    const onSelectTab = () => {
        dispatch(changeActiveTab(!activeTab))
    }
    //
    return (
        <View style={styles.contianer}>
            <TouchableOpacity activeOpacity={0.6} onPress={onSelectTab} style={[styles.tabCon, { borderColor: activeTab ? COLORS.primary_color : COLORS.gray_color, borderBottomWidth: activeTab ? 1.5 : 0.1 }]}>
                <Text style={[styles.tabText, { color: activeTab ? '#000' : 'gray' }]}>
                    Categories
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onSelectTab} style={[styles.tabCon, { borderColor: !activeTab ? COLORS.primary_color : COLORS.gray_color, borderBottomWidth: !activeTab ? 1.5 : 0.1 }]}>
                <Text style={[styles.tabText, { color: !activeTab ? '#000' : 'gray' }]}>
                    Brands
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default MainProductHeader;

const styles = StyleSheet.create({
    contianer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color,
        paddingTop: '3%',
        paddingHorizontal: LAY_OUT.padding,
    },
    tabCon: {
        width: '45%',
        paddingBottom: '3%',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        textTransform: 'uppercase'
    }
})
