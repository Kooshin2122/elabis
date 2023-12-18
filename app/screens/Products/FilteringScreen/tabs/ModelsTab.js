//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { carModelsEndPoint } from '../../BrandsScreen/services';
import { SelectableCard, SelectedItemsCard } from '../components';
//
const ModelsTab = () => {
    return (
        <View style={styles.container}>
            <View style={styles.selectedItemsCon}>
                <SelectedItemsCard />
                <SelectedItemsCard />
            </View>
            <View style={styles.modelsCon}>
                {
                    carModelsEndPoint.map((item) => (
                        <SelectableCard key={item.id} brandName={item.modelName} brandImageUrl={item.modelImageUrl} />
                    ))
                }
            </View>
        </View>
    )
}
//
export default ModelsTab;
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
    modelsCon: {
        flex: 1,
        padding: '4%',
        gap: 9.4,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
