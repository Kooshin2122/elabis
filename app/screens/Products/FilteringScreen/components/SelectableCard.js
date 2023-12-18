//
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { sliceText } from '../../../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
const BrandsCard = ({ id, brandName, brandImageUrl }) => {
    //
    const [selectBrand, setSelectBrand] = useState(false)
    const changeSelectItem = () => {
        setSelectBrand(!selectBrand)
    }
    //
    return (
        <Pressable onPress={changeSelectItem} style={[styles.container, { borderColor: selectBrand ? COLORS.primary_color : COLORS.gray_color }]}>
            <View style={styles.imageCon}>
                <Image
                    resizeMode="contain"
                    source={brandImageUrl}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <Text style={styles.brandName}>
                {sliceText(brandName, 6)}
            </Text>
            {
                selectBrand &&
                <MaterialCommunityIcons
                    size={23}
                    style={styles.icon}
                    color={COLORS.primary_color}
                    name='checkbox-marked-outline'
                />
            }
        </Pressable>
    )
}
//
export default BrandsCard;
//
const styles = StyleSheet.create({
    container: {
        width: '23%',
        padding: '2%',
        borderWidth: 0.7,
        borderRadius: 10,
        borderColor: COLORS.gray_color,
    },
    imageCon: {
        height: 60,
        width: '100%',
        marginBottom: '2%',
    },
    brandName: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center'
    },
    icon: {
        top: 0,
        right: 2,
        fontWeight: '100',
        position: 'absolute',
    }
})
//