//
import React, { useEffect, useState } from 'react';
import { ListEmptyComponent, LoadingModal, ProductCard, SubHeader } from '../../../components';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { formDataGenerator } from '../../../utils';
import { fetchPostAuthData, fetchPostData } from '../../../API';
//
const ShopProductsScreen = ({ route }) => {
    const { USID, name } = route.params;
    const [loading, setLoading] = useState(false);
    const [shopProducts, setShopProducts] = useState([]);
    //
    const getThisShopProductsAsync = async () => {
        const data = { USID: USID };
        const formData = await formDataGenerator(data);
        setLoading(true);
        const response = await fetchPostData("buyer/shop/products", formData);
        setLoading(false);
        setShopProducts(response.data);
        // console.log("response-------->", response.data);
    };
    //
    useEffect(() => {
        getThisShopProductsAsync()
    }, [])
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Shop Products" />
            {loading && <LoadingModal />}
            <FlatList
                numColumns={2}
                data={shopProducts}
                initialNumToRender={8}
                scrollIndicatorInsets={8}
                keyExtractor={(item) => item.UPID}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productsCon}
                renderItem={({ item }) => <ProductCard {...item} />}
                refreshControl={<RefreshControl onRefresh={getThisShopProductsAsync} />}
                ListHeaderComponent={() => (
                    <ListHeader name={name} shopProducts={shopProducts} />
                )}
                ListEmptyComponent={() => (
                    <ListEmptyComponent title="Sorry" message={"Helo"} />
                )}
            />
        </SafeAreaView>
    )
}
//
export default ShopProductsScreen;
//
const ListHeader = ({ name, shopProducts }) => {
    return (
        <View style={styles.resultCon}>
            <Text style={styles.resultTxt}>
                {name} products
                </Text>
            <View style={styles.proLenghtCon}>
                <Text style={styles.resutCounter}>
                    {shopProducts?.length}
                </Text>
            </View>
        </View>
    )
}
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    productsCon: {
        padding: "3%"
    },
    resultCon: {
        borderRadius: 7,
        borderWidth: 0.7,
        paddingLeft: "4%",
        marginVertical: "3%",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "2%",
        borderColor: COLORS.gray_color,
        justifyContent: "space-between",
    },
    resultTxt: {
        fontWeight: "bold",
        letterSpacing: 0.8,
        textTransform: "capitalize"
    },
    proLenghtCon: {
        padding: '4%',
        borderRadius: 7,
        borderLeftWidth: 0.7,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    resutCounter: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.3,
        textTransform: "uppercase",
        color: COLORS.primary_color
    },
});
//