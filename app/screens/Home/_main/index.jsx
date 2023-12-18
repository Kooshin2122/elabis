//
import { fetchGetData, fetchPostAuthData } from '../../../API';
import * as Location from 'expo-location';
import React, { useEffect, useState, useRef } from 'react';
import { specialOffersEndPoint } from './services';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { HomeHeader, SpecialCards, AvailableCategoryCard, } from './components';
import { Devider, MyStatusBar, Container, PopularBrandsCard, ProductCard, LoadingModal } from '../../../components';
import { useAppContext } from '../../../context';
import { StyleSheet, View, SafeAreaView, ScrollView, FlatList, RefreshControl, Text } from 'react-native';

//

const HomeScreen = () => {
    //
    const { navigate } = useNavigation();
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const { userLocation, setUserLocation } = useAppContext();
    const [populaBrandsData, setPopulaBrandsData] = useState([]);
    //
    const getHomeDataAsync = async () => {
        try {
            setRefresh(false);
            setLoading(true);
            const response = await fetchGetData("buyer/user/dashboard");
            setLoading(false);
            // console.log("response 11----------->", response);
            setProductsData(response.products);
            setCategoriesData(response.categories);
            setPopulaBrandsData(response.popular_brands);
        } catch (error) {
            console.log(`Error Happen in the Home Screen Fetching data ----> ${error}`);
        }
    };
    //
    const getPermisionAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            console.log("Status---------", status);
            Location.getCurrentPositionAsync().then(location => {
                console.log("Location-------->", location);
                setUserLocation(location);
            }).catch((error) => console.log("error--", error))
            // setUserLocation(location);
        } catch (error) {
            console.log("error happen when getting permision in the expo", error);
        }
    }
    //
    useEffect(() => {
        getHomeDataAsync();
        getPermisionAsync();
    }, []);
    //
    const onPressPopularBrandsSeeMore = () => {
        navigate("ProductStack", {
            screen: "MainProductsScreen",
            params: {
                screen: "Brands"
            }
        })
        // dispatch(changeActiveTab(false))
    }
    const onPressAvailableProductsSeeMore = () => {
        navigate("ProductStack", {
            screen: "MainProductsScreen",
            params: {
                screen: "Categories"
            }
        })
    }
    const onPressPopularProductsSeeMore = () => {
        navigate('ProductStack', {
            screen: "ProductsScreen"
        })
    }
    //





    return (
        <SafeAreaView style={styles.mainContainer}>
            <MyStatusBar />
            <HomeHeader />
            {loading && <LoadingModal />}
            <ScrollView
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={getHomeDataAsync} />}
                style={styles.scrollCon} showsVerticalScrollIndicator={false}
            >
                <Devider />
                <View style={styles.container}>
                    <Container title="Popular Brands" seeMore style={styles.brandsCon} onPressSeeMore={onPressPopularBrandsSeeMore}  >
                        {
                            populaBrandsData?.map(brandInfo => (
                                <PopularBrandsCard key={brandInfo.id} {...brandInfo} parentScreen="HomeStack" />
                            ))
                        }
                    </Container>
                    <Devider />
                    <Container title="Available Categories" seeMore style={styles.availableCatCon} onPressSeeMore={onPressAvailableProductsSeeMore}  >
                        {
                            categoriesData?.map(categoryInfo => (
                                <AvailableCategoryCard key={categoryInfo.id} {...categoryInfo} />
                            ))
                        }
                    </Container>
                    <Devider />
                    <Container title="Most Viewed Products" seeMore style={styles.categoriesCon} onPressSeeMore={onPressPopularProductsSeeMore}  >
                        {
                            productsData?.map((productInfo, index) => (
                                <ProductCard key={index} {...productInfo} parentScreen="HomeStack" />
                            ))
                        }
                    </Container>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default HomeScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
    },
    container: {
        paddingBottom: LAY_OUT.padding,
        paddingHorizontal: LAY_OUT.padding
    },
    brandsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9
    },
    availableCatCon: {
        columnGap: 9.1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    categoriesCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
})
//