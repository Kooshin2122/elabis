//
import React, { useEffect, useState } from 'react';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { SubHeader, Devider } from '../../../components';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FilteringMaterialTopTabs from './tabs';
import { useNavigation } from '@react-navigation/core';
import { SelectedItemsCard, TabBox } from './components';

const FilteringScreen = ({ route }) => {
    const { getParent } = useNavigation();
    const { tabName, selectItem } = route.params;
    // Hiding Bottom Tab Navigation
    useEffect(() => {
        getParent().setOptions({ tabBarStyle: { display: 'none' } })
        return () => {
            getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopColor: 'rgba(0, 0, 0, .2)',
                    paddingTop: Platform.OS === 'android' ? 15 : 10,
                    paddingBottom: Platform.OS === 'android' ? 15 : 30,
                    height: Platform.OS === 'android' ? 70 : 90,
                }
            })
        }
    }, []);
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Filter" />
            <FilteringMaterialTopTabs activeTab={tabName ? tabName : 'Category'} />
            {/* Control Section */}
            <View style={styles.controlsContainer}>
                <Pressable>
                    <Text style={styles.clearBtnTxt}>
                        Clear All
                    </Text>
                </Pressable>
                <Pressable style={styles.applyBtn}>
                    <Text style={styles.applyBtnTxt}>
                        Apply
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default FilteringScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    selectedItemsCon: {
        flex: 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingHorizontal: '3%',
        borderColor: COLORS.gray_color
    },
    controlsContainer: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3%',
        borderTopWidth: 0.6,
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    clearBtnTxt: {
        fontSize: 15,
        color: '#f43f5f',
        textAlignVertical: 'bottom'
    },
    applyBtn: {
        borderRadius: 4,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        backgroundColor: '#f43f5f'
    }
})
