import React, { useEffect, useState } from 'react'
import SideBarCards from './SideBarCards';
import { useSelector, useDispatch } from 'react-redux';
import CategoriesContainer from './CategoriesContainer';
import { Devider, ListEmptyComponent, LoadingModal } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { allMainCategoriesEndPoint, allSubCategoriesEndPoint } from '../services';
import { changeActiveTab, changeSelectCategory } from '../../../../ReduxStore/ProductScreenSlice';
import { fetchGetData } from '../../../../API';
import { useAppContext } from '../../../../context';
//
const CategoriesSection = ({ route }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [subCatLoading, setSubCatLoading] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const { subCategoriesData, setSubCategoriesData } = useAppContext();
    const { selectCategory } = useSelector(state => state.productsSlice);
    // get Data 
    const getDataAsync = async () => {
        try {
            // AAAFetching Main Categories;
            setLoading(true);
            const response = await fetchGetData("buyer/category/view");
            setLoading(false);
            //
            setCategoriesData(response?.data);
            dispatch(changeSelectCategory({ id: response.data[0].id, name: response.data[0].name }))
            // Fetching Sub Categories;
            setSubCatLoading(true);
            const subCategoryRes = await fetchGetData(`buyer/category/view/main/${response.data[0].id}`);
            setSubCatLoading(false);
            //
            setSubCategoriesData(subCategoryRes?.data);
        } catch (error) {
            setLoading(false);
            setSubCatLoading(false);
            console.log("Error Happen When Fetching Categories Data in the products screen Categories Tab");
        }
    };
    //
    useEffect(() => {
        getDataAsync();
        // dispatch(changeActiveTab(true))
    }, []);
    //
    return (
        <View style={styles.container}>
            {loading && <LoadingModal />}
            {/* side bar */}
            <View style={styles.sideBar}>
                <FlatList
                    data={categoriesData}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <SideBarCards {...item} setSubCatLoading={setSubCatLoading} />}
                />
            </View>
            {/* Main View */}
            <View style={styles.mainView}>
                <ScrollView style={styles.mainViewScrollCon} showsVerticalScrollIndicator={false}>
                    {/* select category name */}
                    <View style={LAY_OUT.flex_row}>
                        <Text style={{ color: 'gray' }}>
                            {selectCategory.name}
                        </Text>
                        <View style={{ borderBottomWidth: 1.2, borderColor: COLORS.gray_color, height: 5, flex: 1, marginLeft: 5 }} />
                    </View>
                    <Devider />
                    {subCatLoading && <ActivityIndicator size="large" />}
                    {
                        subCategoriesData?.length < 1
                            ?
                            <ListEmptyComponent
                                title="Empty"
                            />
                            :
                            subCategoriesData.map((item, index) => {
                                return (
                                    <CategoriesContainer
                                        key={index}
                                        subCategoryName={item?.name}
                                        categories={item?.productCategories}
                                    />
                                )
                            })
                    }
                    <Devider />
                </ScrollView>
            </View>
        </View>
    )
}
//
export default CategoriesSection;
//
const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: COLORS.bg_primary
    },
    sideBar: {
        flex: 0.7,
        borderRightWidth: 0.5,
        borderColor: COLORS.gray_color,
        paddingHorizontal: '1%',
    },
    mainView: {
        flex: 3,
    },
    mainViewScrollCon: {
        padding: LAY_OUT.padding
    }
})
