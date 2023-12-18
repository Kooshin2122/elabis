//
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { SelectableCard, SelectedItemsCard } from '../components';
import { allBrandsEndPoint } from '../../_main/services';
//
const BrandsTab = () => {
    return (
        <View style={styles.container}>
            <View style={styles.selectedItemsCon}>
                <SelectedItemsCard />
                <SelectedItemsCard />
            </View>
            <View style={styles.brandsCon}>
                {
                    allBrandsEndPoint.map((item) => (
                        <SelectableCard key={item.id} {...item} />
                    ))
                }
            </View>
        </View>
    )
}
//
export default BrandsTab;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    selectedItemsCon: {
        flex: 0.09,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: '1%',
        paddingHorizontal: '3%',
        borderColor: COLORS.gray_color
    },
    brandsCon: {
        flex: 1,
        padding: '4%',
        gap: 9.4,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
