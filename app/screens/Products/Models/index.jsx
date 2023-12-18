//
import React from 'react';
import { carModelsEndPoint, modalMonufactoringYearEndPoint } from '../BrandsScreen/services';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { CarModelCard, Container, Devider, SubHeader } from '../../../components';
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MonufactorYearCard } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const ModelsScreen = ({ route }) => {
    const { navigate } = useNavigation();
    const { selectYear } = useSelector((state) => state.productsSlice);
    const { id, modelName, modelImageUrl } = route?.params?.selectModalInfo;
    const navigateProductsScreen = () => {
        navigate('ProductsScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title={modelName} />
            <ScrollView style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                <Devider />
                <FlatList
                    horizontal
                    data={carModelsEndPoint}
                    renderItem={({ item }) => (
                        <CarModelCard {...item} style={{ marginRight: 10, borderColor: item.id == id ? COLORS.primary_color : COLORS.gray_color }} />
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                <Devider />
                <Container title={`${modelName} ( ${selectYear} )`} style={styles.brandsCon}  >
                    {
                        modalMonufactoringYearEndPoint.map(year => (
                            <MonufactorYearCard key={year.id} {...year} />
                        ))
                    }
                </Container>
                <Devider />
            </ScrollView>
            <View style={styles.contorlsCon}>
                <Text>
                    {`${modelName} ( ${selectYear} )`}
                </Text>
                <Pressable onPress={navigateProductsScreen} style={styles.nextBtn}>
                    <Text style={{ color: '#fff', fontSize: 16, letterSpacing: 1 }}>
                        NEXT
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ModelsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
        paddingBottom: '5%',
        paddingHorizontal: LAY_OUT.paddingX,
    },
    brandsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9.1
    },
    contorlsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        backgroundColor: COLORS.bg_tertiary
    },
    nextBtn: {
        paddingVertical: '2%',
        paddingHorizontal: '6%',
        borderRadius: 5,
        backgroundColor: COLORS.primary_color
    }
})
