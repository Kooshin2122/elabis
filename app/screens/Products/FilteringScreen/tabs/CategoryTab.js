//
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SideBarCards } from '../../_main/components';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { SelectedItemsCard, SubCategoryCon } from '../components';
import { Devider } from '../../../../components';
import { allMainCategoriesEndPoint, allSubCategoriesEndPoint } from '../../_main/services';
//
const CategoryTab = () => {
    const { selectCategory, selectSubCategory } = useSelector(state => state.productsSlice);
    const [selectedItems, setSelectedItems] = useState([selectSubCategory[0]]);
    //
    return (
        <View style={styles.container}>
            <View style={styles.selectedItemsCon}>
                <FlatList
                    horizontal
                    data={selectedItems}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <SelectedItemsCard item={item} changeSelectedItems={setSelectedItems} />}
                />
            </View>
            {/* Main Container */}
            <View style={styles.MainContainer}>
                {/* Side Bar Section */}
                <View style={styles.SideBarContainer}>
                    <FlatList
                        data={allMainCategoriesEndPoint}
                        renderItem={({ item }) => <SideBarCards {...item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                {/* Main View Section */}
                <ScrollView style={styles.MainViewContainer} showsVerticalScrollIndicator={false} >
                    {/* Selected main category name */}
                    <View style={LAY_OUT.flex_row}>
                        <Text style={{ color: 'gray' }}>
                            {selectCategory}
                        </Text>
                        <View style={{ borderBottomWidth: 1.2, borderColor: COLORS.gray_color, height: 5, flex: 1, marginLeft: 5 }} />
                    </View>
                    <Devider />
                    <View style={styles.subCategoryContainer}>
                        {
                            allSubCategoriesEndPoint.map((item) => (
                                <SubCategoryCon key={item.id} title={item.subCategoryName} {...item} changeSelectedItems={setSelectedItems} />
                            ))
                        }
                    </View>
                    <Devider />
                    <Devider />
                </ScrollView>
            </View>
        </View>
    )
}

export default CategoryTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    selectedItemsCon: {
        // flexDirection: 'row',
        // alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: '3%',
        paddingHorizontal: '3%',
        borderColor: COLORS.gray_color
    },
    SideBarContainer: {
        flex: 0.3,
        borderRightWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    MainViewContainer: {
        flex: 1,
        padding: '3%',
        // backgroundColor: COLORS.bg_secondary
    },
    controlsContainer: {
        flex: 0.1,
        backgroundColor: 'blue',
        borderTopWidth: 0.6,
        borderColor: COLORS.gray_color
    },
    subCategoryContainer: {

    }
})
