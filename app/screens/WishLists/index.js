//
import React, { useCallback, useEffect, useState } from 'react';
//
import { fetchGetAuthData } from '../../API';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { CustomButton, Devider, Header, ListEmptyComponent, LoadingModal, ProductCard } from '../../components';
import { Dimensions, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
//
const { width, height } = Dimensions.get('screen');
//
const WishListScreen = () => {
    const { navigate } = useNavigation();
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [wishListData, setWishListData] = useState([]);
    const [isUserLoging, setIsUserLoging] = useState(true);
    //
    const getWishListDataAsync = async () => {
        try {
            setLoading(true);
            setRefresh(false);
            const response = await fetchGetAuthData("buyer/wishlist/view");
            setWishListData(response?.data.products_in_wishlist);
            // console.log("gggg", response?.data.products_in_wishlist);
            setLoading(false);
            setIsUserLoging(true);
        } catch (error) {
            setLoading(false);
            if (error == "TypeError: Cannot read property 'token_type' of null") {
                setWishListData([]);
                setIsUserLoging(false);
            }
            console.log(`error happened in the WishList Screen ---> ${error}`);
        }
    };
    useFocusEffect(useCallback(() => {
        getWishListDataAsync();
    }, []))
    // useEffect(() => {
    //     getWishListDataAsync();
    // }, []);
    //
    console.log("wishListData--------->", wishListData?.id);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header label="Wish List" />
            {loading && <LoadingModal />}
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={getWishListDataAsync} />}
            >
                {
                    isUserLoging ?
                        <FlatList
                            numColumns={2}
                            scrollEnabled={false}
                            data={wishListData}
                            // keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.flatListCon}
                            ListHeaderComponent={() => <ListHeader name="Wish List" shopProducts={wishListData} />}
                            ListEmptyComponent={() => <ListEmptyComponent title="Sorry You do not have" />}
                            renderItem={({ item }) => <ProductCard {...item} parentScreen="WishListScreen" />
                            }
                        />
                        :
                        <View style={{ flex: 1, padding: "4%", }}>
                            <ListHeader name="Wish List" shopProducts={wishListData} />
                            <Devider />
                            <View style={styles.signInCon}>
                                <ListEmptyComponent
                                    title="Sign In Please"
                                    exclamationIcon={true}
                                    message="Looks like you have not Signg-In yet. Click this below button to sign-in or sign-up"
                                >
                                    <CustomButton
                                        title="Sign-In"
                                        clickHandler={() => navigate("AuthStack")}
                                    />
                                </ListEmptyComponent>
                            </View>
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default WishListScreen;
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
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    flatListCon: {
        padding: '3%'
    },
    categoriesCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
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
    signInCon: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.7,
        marginHorizontal: "2%",
        borderColor: COLORS.gray_color
    }
})
//