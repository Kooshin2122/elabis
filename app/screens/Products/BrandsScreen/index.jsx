import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import { useDispatch } from 'react-redux';
import { CarModelCard, Container, Devider, PopularBrandsCard, SubHeader } from '../../../components'
import { hideTabBar } from '../../../ReduxStore/GlobalSlice';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { allBrandsEndPoint } from '../_main/services';
import { SearchModal } from './components';
import { carModelsEndPoint } from './services';

const BrandsScreen = ({ route }) => {
    const { id, brandName, brandImageUrl, parentScreen } = route?.params?.brand;
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title={brandName} backTo={parentScreen} />
            <ScrollView style={styles.scrollCon}>
                <Devider />
                <FlatList
                    horizontal
                    data={allBrandsEndPoint}
                    renderItem={({ item }) => (
                        <PopularBrandsCard {...item} style={{ marginRight: 10, borderColor: item.id == id ? COLORS.primary_color : COLORS.gray_color }} />
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                <Devider />
                {/* Search Feild */}
                <SearchModal />
                <Devider />
                {/* Models Container */}
                <Container title={`${brandName} Models`} style={styles.modelsContainer} >
                    {
                        carModelsEndPoint.map(modelInfo => (
                            <CarModelCard key={modelInfo.id} {...modelInfo} />
                        ))
                    }

                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BrandsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary,
    },
    scrollCon: {
        flex: 1,
        paddingBottom: '5%',
        paddingHorizontal: LAY_OUT.paddingX,
    },
    modelsContainer: {
        gap: 9,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
