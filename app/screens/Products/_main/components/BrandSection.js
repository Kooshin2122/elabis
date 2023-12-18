import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { popularBrandsEndPoint } from '../../../Home/_main/services';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Container, Devider, LoadingModal, PopularBrandsCard } from '../../../../components';
import { allBrandsEndPoint } from '../services';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveTab } from '../../../../ReduxStore/ProductScreenSlice';
import { fetchGetData } from '../../../../API';
//
const BrandSection = () => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(false);
    const [brandsData, setBrandsData] = useState([]);
    const [popularBrandsData, setPopularBrandsData] = useState([]);
    const { activeTab } = useSelector((state) => state.productsSlice);
    // 
    const getBrandsDataAsync = async () => {
        setRefresh(false);
        const response = await fetchGetData("buyer/brand/view", setLoading);
        setBrandsData(response.data);
        setPopularBrandsData(response.popularBrands)
        // console.log("brandresponse", response.popularBrands);
    }
    useEffect(() => {
        getBrandsDataAsync()
    }, [])
    //
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={getBrandsDataAsync} />}
        >
            {loading && <LoadingModal />}
            <Container title="Popular Brands" style={styles.brandsCon}  >
                {
                    popularBrandsData.map(brandInfo => (
                        <PopularBrandsCard key={brandInfo.id} {...brandInfo} />
                    ))
                }
            </Container>
            <Devider />
            <Container title="All Brands" style={styles.brandsCon}  >
                {
                    brandsData.map(brandInfo => (
                        <PopularBrandsCard key={brandInfo.id} {...brandInfo} />
                    ))
                }
            </Container>
            <Devider />
        </ScrollView>
    )
}

export default BrandSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    brandsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9.1
    }
})
