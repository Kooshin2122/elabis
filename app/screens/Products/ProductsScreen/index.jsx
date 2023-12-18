//
import React, { useEffect, useState } from 'react';
import { FilterBox } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { FlatList, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Container, Devider, ListEmptyComponent, LoadingModal, ProductCard, SubHeader } from '../../../components';
import { formDataGenerator } from '../../../utils';
import { fetchGetData, fetchPostData } from '../../../API';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { changeSelectBrand, changeSelectSubCategory } from '../../../ReduxStore/ProductScreenSlice';
//
const ProductsScreen = () => {
    //
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [productsData, setProductsData] = useState();
    const { selectSubCategory, selectBrand, } = useSelector((state) => state.productsSlice)
    //
    const getProductsDataAsync = async () => {
        setLoading(true);
        setRefresh(false);
        const filterData = {
            brand: selectBrand?.id,
            productcategory: selectSubCategory?.id,
        }
        const formData = formDataGenerator(filterData);
        // console.log("Payload", formData, selectSubCategory?.name);
        const response = await fetchPostData("buyer/products/search", formData)
        // console.log("productsData", response);
        setProductsData(response.data)
        setLoading(false);

    }
    //
    useEffect(() => {
        getProductsDataAsync()
    }, [selectBrand, selectSubCategory])
    const emptyListMessage = `sorry we don't have ${selectSubCategory?.name} and ${selectBrand?.name}`
    //
    return (
        <SafeAreaView style={styles.contianer}>
            <SubHeader title="products" />
            {loading && <LoadingModal />}
            {/* Filtering box */}
            <View style={styles.filterBoxesContainer}>
                <FilterBox title="Category" selectItem={selectSubCategory?.name} />
                <FilterBox title="Brands" selectItem={selectBrand?.name} />
                <FilterBox title="Shop" selectItem={"All"} />
            </View>
            {/*  */}
            {/* Products Section */}
            <View style={styles.scollCon}>
                <FlatList
                    numColumns={2}
                    data={productsData}
                    initialNumToRender={8}
                    scrollIndicatorInsets={8}
                    keyExtractor={(item) => item.UPID}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.productsCon}
                    renderItem={({ item }) => <ProductCard {...item} hideCart={true} parentScreen="ProductsScreen" reloadScreen={getProductsDataAsync} />}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={getProductsDataAsync} />}
                    ListHeaderComponent={() => <ResutlView productsData={productsData} reloadScreen={getProductsDataAsync} />}
                    ListEmptyComponent={() => <ListEmptyComponent title="Sorry" message={emptyListMessage} />}
                />
            </View>
        </SafeAreaView>
    )
}
//
export default ProductsScreen;
//
const ResutlView = ({ productsData, reloadScreen = () => { } }) => {
    //
    const dispatch = useDispatch();
    const { selectSubCategory, selectBrand, } = useSelector((state) => state.productsSlice);
    //
    const clearBrandFilterResult = () => {
        dispatch(changeSelectBrand({ id: 0, name: "All" }));
    }
    //
    const clearCategoriesFilterResult = () => {
        dispatch(changeSelectSubCategory({ id: 0, name: "All" }));
    }
    //
    return (
        <View>
            <Devider />
            <View style={styles.resultCon}>
                <View style={styles.filterCon}>
                    <FontAwesome name="sliders" size={23} color={COLORS.primary_color} />
                </View>
                <Text style={styles.resultTxt}>
                    Filter Results
                </Text>
                <View style={styles.proLenghtCon}>
                    <Text style={[styles.resutTitle, { fontSize: 15 }]}>
                        {productsData?.length}
                    </Text>
                </View>
            </View>
            <View style={styles.selectedItemsCon}>
                <FilterResultView selectItem={selectBrand} changeSelectedItem={clearBrandFilterResult} />
                <FilterResultView selectItem={selectSubCategory} changeSelectedItem={clearCategoriesFilterResult} />
                {
                    selectBrand.name == "All" && selectSubCategory.name == "All"
                    &&
                    <Text>
                        All Product
                    </Text>
                }
            </View>
            <Devider />
        </View>
    )
}
//
const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    filterBoxesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        borderBottomWidth: 0.6,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    scollCon: {
        flex: 1,
        backgroundColor: "#fefefe",
        paddingHorizontal: LAY_OUT.paddingX,
    },
    resultCon: {
        columnGap: 15,
        borderRadius: 7,
        borderWidth: 0.7,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "2%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    filterCon: {
        padding: '4%',
        borderRadius: 7,
        borderRightWidth: 0.7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    resutTitle: {
        fontSize: 11,
        fontWeight: "bold",
        letterSpacing: 0.3,
        textTransform: "uppercase",
        color: COLORS.primary_color
    },
    resultTxt: {
        flex: 1,
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: 0.6,
        textAlign: "center",
        color: COLORS.black_color,
        textTransform: "uppercase",
    },
    proLenghtCon: {
        padding: '4%',
        borderRadius: 7,
        borderLeftWidth: 0.7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    selectedItemsCon: {
        columnGap: 15,
        padding: "4%",
        borderWidth: 0.7,
        borderTopWidth: 0.7,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "2%",
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    productsCon: {
        columnGap: 20,
    },
    FilterResultViewCon: {
        padding: "3%",
        columnGap: 5,
        borderRadius: 5,
        borderWidth: 0.7,
        paddingRight: "4%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.primary_color,
    },
    FilterResultViewLbl: {
        fontSize: 12,
        fontWeight: "500",
        letterSpacing: 0.5,
    }
})

//
const FilterResultView = ({ selectItem, changeSelectedItem = () => { } }) => {
    const [isActive, setIsActive] = useState(true);
    const onSelect = () => {
        setIsActive(false)
        changeSelectedItem();
    }
    return (
        <>
            {
                selectItem?.name !== "All"
                &&
                <Pressable onPress={onSelect} style={[styles.FilterResultViewCon, { borderColor: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
                    <MaterialIcons
                        size={20}
                        name={"cancel-presentation"}
                        color={isActive ? COLORS.primary_color : COLORS.gray_color}
                    />
                    <Text style={[styles.FilterResultViewLbl, { color: isActive ? COLORS.primary_color : COLORS.gray_color }]}>
                        {selectItem?.name}
                    </Text>
                </Pressable>
            }
        </>
    )
}